import React from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { refetchCartData, toggleBox } from "../../../redux/slices/cart";
import { convert_price, get_sum } from "@/utils/price";
import axios from "axios";

const CartBox = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  //console.log({ items: cart.items });

  const handleUpdate = async (cart_item, quantity) => {
    try {
      await axios.post("/api/cart/update", {
        cart_item: cart_item,
        quantity: quantity,
      });
      dispatch(refetchCartData({ email: session.user.email }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        onClick={() => dispatch(toggleBox())}
        className="fixed top-0 left-0 z-50  h-0 group-[.appear]/cartbox:h-screen w-screen bg-primary-50 backdrop-blur-1 transition"
      />
      <div className=" group-[.appear]/cartbox:translate-x-0 translate-x-full fixed w-screen h-screen md:w-1/2 lg:w-1/4 sm:h-auto sm:translate-y-[115px] overflow-auto z-50 top-0 right-0 ease-in-out bg-secondary transition-all duration-300 sm:border ">
        <div className="h-full w-full">
          <div className="flex items-center justify-between gap-4 p-4 border-b">
            <p>Giỏ hàng</p>
            <IoIosClose
              onClick={() => dispatch(toggleBox())}
              className=" cursor-pointer"
              size={25}
            />
          </div>
          <div className="max-h-[70vh] sm:max-h-[45vh] overflow-auto">
            <ul>
              {cart.status === "idle" ? (
                <li className="p-10 text-center">Đăng nhập để mua hàng</li>
              ) : cart.status === "loading" || cart.status === "failed" ? (
                <li className="p-10 text-center">Đang tải giỏ hàng</li>
              ) : cart.items.length <= 0 ? (
                <li className="p-10 text-center">Giỏ hàng chưa có sản phẩm</li>
              ) : (
                cart.items.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="grid grid-cols-3 p-4 border-b gap-5"
                    >
                      <div className="col-span-1">
                        <a
                          className="block w-full pt-[125%] bg-center bg-cover bg-no-repeat"
                          href={`/p/${item.product.slug}`}
                          style={{
                            backgroundImage: `url(${item.product.colors.mark})`,
                          }}
                        ></a>
                      </div>
                      <div className="col-span-2 flex flex-col gap-4">
                        <div>
                          <div className="uppercase flex items-start justify-between text-sm">
                            <a href={`/p/${item.product.slug}`}>
                              {item.product.title}
                            </a>
                            <IoIosClose
                              onClick={() => handleUpdate(item, 0)}
                              size={20}
                              className=" cursor-pointer"
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <h3 className=" ">{item.product.price}</h3>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="grid gap-1">
                            <div className="grid grid-cols-3 items-center ">
                              <p className="capitalize font-normal text-sm">
                                số lượng
                              </p>
                              <div className="grid grid-cols-3 items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleUpdate(item, item.quantity - 1)
                                  }
                                  className="text-xl px-1"
                                >
                                  -
                                </button>
                                <p className="text-center">{item.quantity}</p>
                                <button
                                  onClick={() =>
                                    handleUpdate(item, item.quantity + 1)
                                  }
                                  className="text-xl px-1 "
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 items-center ">
                              <p className="capitalize font-normal text-sm">
                                màu
                              </p>
                              <p className=" col-span-2">{item.color}</p>
                            </div>
                            <div className="grid grid-cols-3 items-center ">
                              <p className="capitalize font-normal text-sm">
                                size
                              </p>
                              <p>{item.size}</p>
                              <h2>
                                {convert_price(
                                  Number(
                                    item.product.price.replaceAll(",", "")
                                  ) * item.quantity
                                )}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
          <div className="p-4 w-full bg-secondary">
            <div className="flex flex-row justify-between items-center">
              <p className="uppercase font-light">thành tiền</p>
              {cart.status === "succeeded" ? get_sum(cart.items) : <p>0</p>}
            </div>
            <a
              className="p-3 mt-5 uppercase text-center bg-black text-white block w-full h-full"
              href="/checkout"
            >
              thanh toán
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartBox;
