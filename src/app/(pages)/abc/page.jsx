"use client";
import React from "react";

import { signIn } from "next-auth/react";

const page = (props) => {
  return (
    <div className="pt-[300px]">
      <button onClick={() => signIn()}>HEY</button>
    </div>
  );
};

page.propTypes = {};

export default page;
