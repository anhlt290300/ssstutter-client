"use server";

import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/context";

export const POST = async (request) => {
  try {
    const { cart_item, quantity } = await request.json();
    if (quantity > 0) {
      await prisma.cart_items.update({
        where: {
          id: cart_item.id,
        },
        data: {
          quantity: quantity,
        },
      });
    } else {
      await prisma.cart_items.delete({
        where: {
          id: cart_item.id,
        },
      });
    }

    return NextResponse.json({ mess: "success" });
    //console.log(cart);
  } catch (error) {
    return NextResponse.json({ mess: error }, { status: 400 });
  }
};
