"use client";

import { SessionProvider } from "next-auth/react";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";

const ProviderSession = ({ children, session }) => {
  const [intervel, setIntervel] = useState(0);
  return (
    <SessionProvider session={session} refetchInterval={intervel}>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};

export default ProviderSession;
