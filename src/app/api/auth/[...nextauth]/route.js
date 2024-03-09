import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../../../prisma/context";
import bcrypt from "bcryptjs";

export const option = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1day
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, request) {
        return credentials;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, email, credentials, account, profile }) {
      if (account.provider === "google") {
        // await prisma.user.deleteMany();
        // await prisma.cart.deleteMany();
        const user = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (user) {
          return true
        } else {
          try {
            //console.log("profile ", profile);
            let user2 = await prisma.user.create({
              data: {
                name: `${profile.family_name} ${profile.given_name}`,
                email: profile.email,
                active: true,
                image: profile.picture,
              },
            });
            console.log("user ", user2);
            await prisma.cart.create({
              data: {
                userId: user2.id,
              },
            });
          } catch (error) {
            console.log(error);
          }
        }
      } else if (account.provider === "credentials") {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) throw new Error("Incorrect email or password.");
        if (credentials.check) return true; /// chuyen sang trang tao password
        if (!user.password) {
          throw new Error(
            "This email address is currently being used with Google. Please sign in with Google."
          );
        } else {
          const check = bcrypt.compare(
            credentials.password,
            user.password,
            (error, res) => {
              if (!res) return false;
              return true;
            }
          );
          if (!check) throw new Error("Incorrect email or password.");
        }
      }
      return true;
    },
    async session({ session, token, user }) {
      //console.log({ session });
      // const user_ = await prisma.user.findUnique({
      //   where: { email: session.user.email },
      // });
      // session.user_id = user_.id;
      return session;
    },
  },
};
const handler = NextAuth(option);

export { handler as POST, handler as GET };
