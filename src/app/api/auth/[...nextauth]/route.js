import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

export const option = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      type: "credentials",
      credentials: {
        name: { label: "UserName", type: "text" },
        phone: { label: "PhoneNumber", type: "number" },
        address: { label: "Address", type: "text" },
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
        ///console.log("aaaa" + { credentials });
        return {
          email: credentials.email,
          name: credentials.name,
          password: credentials.password,
        };
        // return {
        //   //name: credentials.name,
        //   password: "a",
        // };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, email, credentials, account, profile }) {
      // if (!profile?.email) {
      //   throw new Error("no profile");
      // }
      //console.log(user);
      return { account, profile };
    },
    async jwt({ token, user }) {
      //console.log(token);
      return token;
    },
  },
};
const handler = NextAuth(option);

export { handler as POST, handler as GET };
