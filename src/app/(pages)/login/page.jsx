"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
const page = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    signIn("credentials", {
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: "http://localhost:3000/register",
    });
  };

  return (
    <div className="mt-[300px]">
      <button
        className="p-4 text-center bg-black text-white border "
        onClick={() =>
          signIn("google", { callbackUrl: "http://localhost:3000/register" })
        }
      >
        Google
      </button>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="p-16 flex flex-col gap-2"
      >
        <input name="email" type="email" placeholder="email" />
        <input name="name" type="text" />
        <input name="password" type="password" />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default page;
