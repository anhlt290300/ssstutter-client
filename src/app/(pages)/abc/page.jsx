"use client";
import React from "react";

import { signIn, useSession } from "next-auth/react";

const page = (props) => {
  const { status, data: session } = useSession();
  console.log(session);
  return (
    <div className="pt-[300px]">
      <button onClick={() => signIn()}>HEY</button>
    </div>
  );
};

page.propTypes = {};

export default page;
