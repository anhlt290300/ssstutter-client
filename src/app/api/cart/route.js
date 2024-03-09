"use server";
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/context";
import { convert_price } from "@/utils/price";

export const POST = async (request) => {
  try {
    const { product, size, color, email } = await request.json();
    const cart = await prisma.cart.findFirst({
      where: {
        user: {
          email: email,
        },
      },
    });

    const cart_items = await prisma.cart_items.findMany({
      where: {
        cartId: cart.id,
      },
    });
    let cart_item = cart_items.find(
      (e) =>
        e.productId === product.id && e.size === size && e.color === color.title
    );
    if (cart_item) {
      await prisma.cart_items.update({
        where: {
          id: cart_item.id,
        },
        data: {
          quantity: cart_item.quantity + 1,
        },
      });
    } else {
      await prisma.cart_items.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity: 1,
          color: color.title,
          size: size,
        },
      });
    }
    return NextResponse.json({ mess: "success" });
    //console.log(cart);
  } catch (error) {
    return NextResponse.json({ mess: error }, { status: 400 });
  }
};

export const GET = async (request) => {
  const email = request.nextUrl.searchParams.get("email");
  const cart = await prisma.cart.findFirst({
    where: {
      user: {
        email: email,
      },
    },
  });
  let cart_items = await prisma.cart_items.findMany({
    where: {
      cartId: cart.id,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  cart_items = await Promise.all(
    cart_items.map(async (item, index) => {
      let product = await prisma.products.findFirst({
        where: {
          id: item.productId,
        },
      });

      product.colors = product.colors.find((e) => e.title === item.color);
      product.price =
        product.discount > 0
          ? convert_price((product.cost * (100 - product.discount)) / 100)
          : convert_price(product.cost);
      return {
        ...item,
        product: product,
      };
    })
  );

  return NextResponse.json({ cart_items }, { status: 200 });
};
