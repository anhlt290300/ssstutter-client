"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../redux/slices/session";
import { fetchCartData } from "../redux/slices/cart";

const CheckAuth = ({ children }) => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  //console.log("session ", status);
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(loginUser({ user: session.user }));
      dispatch(fetchCartData({ email: session.user.email }));
    } else if (status === "unauthenticated") {
      dispatch(logoutUser());
    }
  }, [status, dispatch]);

  return <div>{children}</div>;
};

export default CheckAuth;
