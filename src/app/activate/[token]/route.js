import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/context";
import { use } from "react";
import { redirect } from "next/navigation";

export const GET = async (request, { params }) => {
  const { token } = params;

  const user = await prisma.user.findFirst({
    where: {
      activeToken: {
        some: {
          AND: [
            {
              activeAt: undefined,
            },
            {
              createAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000), /// 24h ago
              },
            },
            {
              token: token,
            },
          ],
        },
      },
    },
  });

  if (!user) {
    throw new Error("invalid token");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      active: true,
    },
  });

  await prisma.activeToken.update({
    where: {
      token,
    },
    data: {
      activeAt: new Date(),
    },
  });

  redirect("/login");
  return NextResponse.json({ mess: "success " });
};
