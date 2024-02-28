"use client";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { RiErrorWarningLine } from "react-icons/ri";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import React, { useState } from "react";
import image from "@/assets/image/bg.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import axios from "axios";

const checkUserName = (string) => {
  const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return regex.test(string);
};
const page = () => {
  // const { data: session, status, update } = useSession();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [hidepassword, setHidepassword] = useState(true);
  const [hiderepassword, setHiderepassword] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !address || !email || !password || !repassword) {
      setError("Input not null");
    } else if (checkUserName(name)) {
      setError("Username cannot contain special characters");
    } else if (password.length < 8) {
      setError("Password contains at least 8");
    } else if (repassword !== password) {
      setError("Repeat password incorrect");
    } else {
      try {
        setLoading(true);
        await axios.post("/api/auth/register", {
          username: name,
          phone: phone,
          address: address,
          email: email,
          password: password,
        });
        setLoading(false);
        setIsCreate(true);
      } catch (error) {
        //setError(error);
        console.log(error);

        setLoading(false);
        error.response?.data?.message
          ? setError(error.response?.data.message)
          : setError("Something went wrong");
      }
    }
    // try {
    //   const rs = await axios.post("/api/auth/register", {
    //     username: "admin",
    //     phone: "0918806450",
    //     address: "address",
    //     email: "ad@gmail.com",
    //     password: "password123",
    //   });
    // } catch (error) {}
  };
  return isCreate ? (
    <ResultRegisterPage />
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
          <h1 className="font-bold text-5xl uppercase">Register</h1>
        </div>
        <div className="col-span-2 bg-black/10 flex items-center justify-center flex-col gap-6">
          <div
            onClick={() => signIn("google")}
            className="flex items-center gap-4 cursor-pointer hover:bg-white/10 px-4 py-1 rounded-full"
          >
            <div className=" p-2 rounded-full bg-white inline-block  m-auto">
              <FcGoogle size={30} />
            </div>
            <h4 className=" text-xl">
              Register with <strong className=" text-white">Google</strong>
            </h4>
          </div>
          <p className="text-xl">
            Or with <strong className=" text-white">Email</strong>
          </p>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="flex flex-col gap-5  justify-center items-center bg-white/20 px-16 py-6 rounded-md"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className=" relative">
                <label
                  htmlFor="username"
                  className="flex items-center gap-2  font-semibold bg-transparent mb-2"
                >
                  User name <FaRegUser size={25} />
                </label>
                <input
                  onFocus={() => (error ? setError("") : "")}
                  className="pl-4 pr-8 py-3 border rounded-lg border-black/40 focus:border-black outline-none bg-white w-72"
                  name="username"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter your name ...."
                />
              </div>
              <div className=" relative">
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2  font-semibold bg-transparent mb-2"
                >
                  Phone Number <MdOutlineLocalPhone size={25} />
                </label>
                <input
                  className="pl-4 pr-8 py-3 border rounded-lg border-black/40 focus:border-black outline-none bg-white w-72"
                  name="phone"
                  onFocus={() => (error ? setError("") : "")}
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  type="number"
                  maxLength={10}
                  placeholder="Enter your phone number ...."
                />
              </div>
              <div className=" relative">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2  font-semibold bg-transparent mb-2"
                >
                  Email <TfiEmail size={25} />
                </label>
                <input
                  className="pl-4 pr-8 py-3 border rounded-lg border-black/40 focus:border-black outline-none bg-white w-72"
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
                  htmlFor="address"
                  className="flex items-center gap-2  font-semibold bg-transparent mb-2"
                >
                  Address <IoLocationSharp size={25} />
                </label>
                <input
                  className="pl-4 pr-8 py-3 border rounded-lg border-black/40 focus:border-black outline-none bg-white w-72"
                  name="address"
                  onFocus={() => (error ? setError("") : "")}
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  type="text"
                  placeholder="Enter your address ...."
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
                    className="pl-4 pr-8 py-3 border rounded-lg border-black/40 focus:border-black outline-none bg-white w-72"
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
              <div className=" relative">
                <label
                  htmlFor="repassword"
                  className="flex items-center gap-2  font-semibold bg-transparent mb-2"
                >
                  Repeat your password <IoKeyOutline size={25} />
                </label>
                <div className="relative">
                  <input
                    className="pl-4 pr-8 py-3 border rounded-lg border-black/40 focus:border-black outline-none bg-white w-72"
                    onFocus={() => (error ? setError("") : "")}
                    onChange={(e) => setRepassword(e.target.value)}
                    value={repassword}
                    name="repassword"
                    type={hiderepassword ? "password" : "text"}
                    placeholder="Enter your password again ...."
                  />
                  <div
                    onClick={() => setHiderepassword(!hiderepassword)}
                    className=" flex items-center justify-center p-2 absolute right-2 bottom-1/2 translate-y-1/2 cursor-pointer bg-transparent hover:bg-black/10 rounded-full"
                  >
                    {hiderepassword ? (
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
              Register
            </button>
          </form>
          <div className="flex items-center justify-center gap-2">
            <h2 className=" font-semibold text-xl">Have a Account?</h2>
            <a href="/login" className=" text-white text-lg underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultRegisterPage = () => {
  return (
    <div className="bg-white h-screen w-screen relative overflow-y-hidden flex items-center justify-start flex-col gap-4 pt-24">
      <HiOutlineShieldCheck size={40} className=" animate-bounce" />
      <p className=" text-xl">Check email to vetify account!!!</p>
      <a
        className="bg-black/60 hover:bg-black/80 rounded-lg text-white font-semibold py-2 px-4 text-xl inline-block"
        href="/login"
      >
        Back to login
      </a>
    </div>
  );
};

export default page;
