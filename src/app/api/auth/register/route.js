"use server";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/context";
import { Resend } from "resend";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import CustomEmail from "../../../../../mail/CustomEmail";
import { env } from "process";
const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request) => {
  try {
    const { username, phone, address, email, password } = await request.json();
    //console.log(typeof phone);
    const salt = bcrypt.genSaltSync(10);
    const newpassword = await bcrypt.hash(password, salt);
    await prisma.user.deleteMany();
    await prisma.activeToken.deleteMany({});
    let user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 500 }
      );
    } else {
      user = await prisma.user.create({
        data: {
          name: username,
          email: email,
          phone: Number(phone),
          address: address,
          password: newpassword,
        },
      });

      const token = await prisma.activeToken.create({
        data: {
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
          userId: user.id,
        },
      });

      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Please verify account ",
        react: (
          <CustomEmail
            magicLink={`${process.env.NEXTAUTH_URL}/activate/${token.token}`}
            username={user.name}
          />
        ),
      });
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ mess: "success" });
};
