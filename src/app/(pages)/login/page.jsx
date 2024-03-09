"use client";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { GoShield } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import image from "@/assets/image/bg.png";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

const Login = () => {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hidepassword, setHidepassword] = useState(true);
  const [remember, setRemember] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const handleRegisterWithGoogle = () => {
    //signOut();
    setLoading(true);
    let login = signIn("google", {
      redirect: false,
    });
    console.log(login);
    //if (!login.error) route.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      setError("All field is required.");
      setLoading(false);
    } else if (password.length < 8) {
      setError("The password must have at least 8 characters. ");
      setLoading(false);
    } else {
      let login = await signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: "/",
        redirect: false,
      });
      //console.log(login)
      setLoading(false);
      if (login.error && login.error !== "Please check email for confirmation")
        setError(login.error);
      if (login.error === "Please check email for confirmation")
        setCheckEmail(true);
      if (!login.error) route.back();
    }
  };
  return checkEmail ? (
    <PleaseCheckEmail />
  ) : (
    <div
      style={{
        backgroundImage: `url("https://dashboard.leanow.vn/upload/7-2023/1690294640922.webp")`,
      }}
      className="  bg-cover h-screen w-screen relative overflow-y-hidden"
    >
      {loading ? (
        <div className=" absolute z-50 top-0 left-0 w-screen h-screen bg-white/40 backdrop-blur-sm flex items-center justify-center">
          <AiOutlineLoading3Quarters size={30} className=" animate-spin" />
        </div>
      ) : (
        ""
      )}
      <div className=" absolute top-0 left-0 h-full w-full bg-white/20 backdrop-blur-sm grid grid-cols-3">
        <div className="flex flex-col items-center justify-center">
          <a href="/">
            <Image
              alt="logo"
              height="200"
              width="200"
              src={image}
              className="h-auto"
            />
          </a>
          <h1 className="font-bold text-5xl uppercase">login</h1>
        </div>
        <div className="col-span-2 bg-black/10 flex items-center justify-center flex-col gap-6 px-28">
          <div
            onClick={() => handleRegisterWithGoogle()}
            className="flex items-center gap-4 cursor-pointer hover:bg-white/10 px-4 py-1 rounded-full"
          >
            <div className=" p-2 rounded-full bg-white inline-block  m-auto">
              <FcGoogle size={30} />
            </div>
            <h4 className=" text-xl">
              Login with <strong className=" text-white">Google</strong>
            </h4>
          </div>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="flex flex-col gap-5  justify-center items-center bg-white/20 px-16 py-6 rounded-md shadow-2xl shadow-white/40 w-full"
          >
            <p className="text-xl">
              Or with <strong className=" text-white">Email</strong>
            </p>
            <div className="grid grid-cols-1 gap-4 w-full">
              <div className=" relative">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2  font-semibold bg-transparent mb-2"
                >
                  Email <TfiEmail size={25} />
                </label>
                <input
                  className="pl-4 pr-8 py-3 border rounded-lg border-black/40 focus:border-black outline-none bg-white w-full"
                  name="email"
                  onFocus={() => (error ? setError("") : "")}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email ...."
                />
              </div>

              <div className=" relative">
                <label
                  htmlFor="password"
                  className="flex items-center gap-2  font-semibold bg-transparent mb-2"
                >
                  Password <RiLockPasswordLine size={25} />
                </label>
                <div className=" relative">
                  <input
                    className="pl-4 pr-8 py-3 border rounded-lg border-black/40 focus:border-black outline-none bg-white w-full"
                    onFocus={() => (error ? setError("") : "")}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                    type={hidepassword ? "password" : "text"}
                    placeholder="Enter your password ...."
                  />
                  <div
                    onClick={() => setHidepassword(!hidepassword)}
                    className=" flex items-center justify-center p-2 absolute right-2 bottom-1/2 translate-y-1/2 cursor-pointer bg-transparent hover:bg-black/10 rounded-full"
                  >
                    {hidepassword ? (
                      <FaRegEyeSlash size={25} />
                    ) : (
                      <FaRegEye size={25} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {error && (
              <div className="flex items-center justify-start w-full gap-2 text-red-600 font-semibold">
                <RiErrorWarningLine size={25} className=" text-red-600" />
                <p>{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="bg-black/60 hover:bg-black/80 rounded-lg text-white font-semibold py-2 w-full text-xl"
            >
              Login
            </button>
          </form>
          <div className="flex items-center justify-between gap-2 w-full px-16">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name=""
                value={remember}
                id="remember_password"
                className="hidden"
              />
              <label
                onClick={() => setRemember(!remember)}
                htmlFor="remember_password"
                className={
                  remember
                    ? " w-5 h-5 rounded border-black border flex items-center justify-center bg-black shadow-md shadow-white/50"
                    : " w-5 h-5 rounded border-black border flex items-center justify-center bg-white"
                }
              >
                <FaCheck size={15} color="white" />
              </label>
              <p
                onClick={() => setRemember(!remember)}
                className=" text-lg cursor-pointer select-none font-semibold"
              >
                Remember password
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className=" underline font-semibold text-lg cursor-pointer ">
                Forgot password?
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h2 className=" font-semibold text-2xl text-white leading-7">
              Don't have an Account?
            </h2>
            <a href="/register" className=" text-black text-xl underline">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const PleaseCheckEmail = () => {
  return (
    <div className="bg-white h-screen w-screen relative overflow-y-hidden flex items-center justify-start flex-col gap-4 pt-24">
      <GoShield size={40} className=" animate-bounce" />
      <p className=" text-xl">Please check email for confirmation</p>
    </div>
  );
};

export default Login;
