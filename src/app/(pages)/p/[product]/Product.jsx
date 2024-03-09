"use client";
import React, { useEffect, useState } from "react";
import { getProductBySlug } from "@/apollo/queries";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import ProductImageList from "./ProductImageList";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refetchCartData } from "../../../../../redux/slices/cart";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createToast } from "../../../../../redux/slices/toast";

const optionsChoice = {
  description: "des",
  deliveryAndpayment: "deli",
  tips: "tips",
};

const Product = () => {
  const session = useSelector((state) => state.session);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const currentPathname = usePathname();
  const router = useRouter();
  const [options, setOptions] = useState(optionsChoice.description);
  const handleSetOptions = (choice) => {
    setOptions(choice);
  };
  const { loading, error, data } = useQuery(getProductBySlug, {
    variables: { slug: currentPathname.replace("/p/", "") },
  });

  const [product, setProduct] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (data) {
      setProduct(data.getProductBySlug);
    }
  }, [data]);

  const handleAdd = async () => {
    if (!color)
      dispatch(
        createToast({
          status: "Vui lòng chọn màu sản phẩm",
          toast_state: "warning",
        })
      );
    else if (size === null)
      dispatch(
        createToast({
          status: "Vui lòng chọn size sản phẩm",
          toast_state: "warning",
        })
      );
    else if (session.status === "unauthenticated") router.push("/login");
    else {
      try {
        setLoad(true);
        const post = await axios.post("/api/cart", {
          product: product,
          size: size,
          color: color,
          email: session.user.email,
        });
        console.log(post);
        if (post.status === 200) {
          dispatch(refetchCartData({ email: session.user.email }));
        }
        setLoad(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGetOptions = () => {
    if (options === optionsChoice.description)
      return (
        product && (
          <div className="py-2">
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </div>
        )
      );
    else if (options === optionsChoice.deliveryAndpayment)
      return (
        product && (
          <div className="p-2 sm:p-4 sm:mt-5 ">
            <h3 className="capitalize font-semibold">chính sách giao hàng</h3>
            <table className="table-auto border-collapse border border-slate-500 mt-2">
              <thead>
                <tr>
                  <th className="border uppercase text-xs p-2">khu vực</th>
                  <th className="border uppercase text-xs p-2">
                    phí giao hàng
                  </th>
                  <th className="border uppercase text-xs p-2">
                    thời gian vận chuyển
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">
                    Nội thành Hà Nội &amp; TP. Hồ Chí Minh
                  </td>
                  <td className="border p-2">Đồng giá 30.000Đ</td>
                  <td className="border p-2">1-2 ngày làm việc.</td>
                </tr>
                <tr>
                  <td className="border p-2">
                    Ngoại thành Hà Nội &amp; TP. Hồ Chí Minh
                  </td>
                  <td className="border p-2">Đồng giá 30.000Đ</td>
                  <td className="border p-2">3-7 ngày làm việc.</td>
                </tr>
                <tr>
                  <td className="border p-2">Các tỉnh thành khác</td>
                  <td className="border p-2">Đồng giá 30.000Đ </td>
                  <td className="border p-2">5-7 ngày làm việc.</td>
                </tr>
              </tbody>
            </table>
            <h3 className="capitalize font-semibold mt-4">
              chính sách thanh toán
            </h3>
            <p>
              Khách hàng mua hàng tại SSSTUTTER có thể thanh toán bằng 3 hình
              thức sau:
            </p>
            <ul className="list-decimal px-4 py-2">
              <li className="text-xs p-2">
                Trả tiền khi nhận hàng (COD): khi nhận được hàng, người nhận
                hàng sẽ thanh toán trực tiếp cho người giao hàng. Khoản thanh
                toán bao gồm tiền hàng và phí giao hàng cho vận chuyển.
              </li>
              <li className="text-xs p-2">Thanh toán qua ví ShopeePay.</li>
              <li className="text-xs p-2">
                Thanh toán bằng thẻ ATM nội địa/thẻ thanh toán quốc tế Visa,
                MasterCard.
              </li>
            </ul>
          </div>
        )
      );
    else if (options === optionsChoice.tips)
      return (
        product && (
          <div className="p-4 sm:p-2 ">
            <h3 className="capitalize font-semibold mt-4">bảo quản</h3>
            <p>*Lưu ý</p>
            <ul className="list-decimal px-4 py-2">
              <li className="text-xs p-2">
                Không để quần áo ở nơi ẩm và nên giặt ngay sau khi sử dụng để
                tránh ẩm mốc
              </li>
              <li className="text-xs p-2">
                Không giặt chung áo trắng với quần áo màu
              </li>
              <li className="text-xs p-2">
                Không nên giặt trong nước nóng quá 40 độ để tránh bị giãn và mất
                form
              </li>
              <li className="text-xs p-2">
                Không đổ trực tiếp bột giặt lên quần áo khi giặt để tránh bị
                phai và loang màu
              </li>
              <li className="text-xs p-2">
                Không ngâm trong xà phòng quá lâu để tránh bạc màu
              </li>
            </ul>
            <p>*Mẹo giữ quần áo lâu mới</p>
            <ul className="list-decimal px-4 py-2">
              <li className="text-xs p-2">
                Nên giặt áo bằng nước lạnh hoặc nước hơi ấm, nước nóng sẽ làm
                vải áo giãn ra
              </li>
              <li className="text-xs p-2">
                Phơi áo dưới nắng nhẹ, tránh nắng gắt để áo không bị bạc màu
              </li>
            </ul>
          </div>
        )
      );
  };

  return (
    <div className="sm:grid sm:grid-cols-3 lg:p-10 xl:px-28 ">
      <div className="sm:col-span-2">
        <ProductImageList
          color={color}
          colors={product ? product.colors : []}
          loading={loading}
        />
      </div>
      <div className="sm:col-span-1 relative">
        <div className="p-4">
          <div className="hidden sm:block">
            <h1 className="uppercase text-2xl">{product && product.title}</h1>
            <div className="flex items-center sm:my-4 gap-10 sm:w-full ">
              <h5 className="text-warning text-3xl font-semibold">
                {product && product.price}
              </h5>
              <p className=" text-3xl font-semibold line-through text-primary-300">
                {product && product.cost}
              </p>
            </div>
          </div>
          <div className="py-2">
            <h4 className="text-center justify-center items-center sm:justify-start capitalize mb-2 flex gap-2">
              chọn màu : <p className="font-semibold">{color && color.title}</p>
            </h4>
            <div className="flex justify-center items-center sm:justify-start flex-wrap gap-4">
              {product &&
                product.colors.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="basis-1/5"
                      onClick={() => {
                        if (!color) setColor(item);
                        else if (color !== item) {
                          setColor(item);
                          setSize(null);
                        }
                      }}
                    >
                      <div
                        className={
                          !color
                            ? "w-full border disabled:grayscale border-secondary"
                            : color === item
                            ? "w-full border-2 disabled:grayscale border-black"
                            : "w-full border disabled:grayscale border-secondary"
                        }
                      >
                        <div
                          className=" block pt-[100%] w-full bg-center bg-cover bg-no-repeat"
                          style={{ backgroundImage: `url(${item.mark})` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="py-2">
            <div className="flex justify-between items-center">
              <h4 className="text-center capitalize sm:text-left">chọn size</h4>
              <h5 className="border-b border-primary-500 flex items-center gap-2 cursor-pointer">
                Bảng size{" "}
                <svg width="20" height="20" viewBox="0 0 256 256">
                  <path
                    fill="currentColor"
                    d="M232 76.7L179.3 24a16.1 16.1 0 0 0-22.6 0L90.3 90.3l-36 36L24 156.7a15.9 15.9 0 0 0 0 22.6L76.7 232a15.9 15.9 0 0 0 22.6 0L232 99.3a15.9 15.9 0 0 0 0-22.6ZM220.7 88L88 220.7L35.3 168L60 143.3l26.3 26.4a8.2 8.2 0 0 0 11.4 0a8.1 8.1 0 0 0 0-11.4L71.3 132L96 107.3l26.3 26.4a8.2 8.2 0 0 0 11.4 0a8.1 8.1 0 0 0 0-11.4L107.3 96L132 71.3l26.3 26.4a8.2 8.2 0 0 0 11.4 0a8.1 8.1 0 0 0 0-11.4L143.3 60L168 35.3L220.7 88Z"
                  ></path>
                </svg>
              </h5>
            </div>
            <div className="flex justify-center sm:justify-between items-center gap-2">
              <ul className="flex items-center justify-center sm:justify-start gap-5 py-2">
                {Array(4)
                  .fill(null)
                  .map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => (color ? setSize(index) : {})}
                      >
                        <button
                          className={
                            size === index
                              ? "w-10 h-10 grid place-content-center border disabled:text-primary-100 border-black"
                              : "w-10 h-10 grid place-content-center border disabled:text-primary-100 border-transparent"
                          }
                        >
                          <span>{index}</span>
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t sm:border-none border-primary-100 p-4 z-10 bg-white">
          <div className="flex items-center justify-between sm:hidden">
            <h2 className="uppercase">{product && product.title}</h2>
            <div className="flex items-center gap-2">
              <h3 className=" text-lg line-through text-primary-300">
                {product && product.cost}
              </h3>
              <h3 className="text-warning text-xl">
                {product && product.price}
              </h3>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 gap-4">
            <button
              type="button"
              className={
                !load
                  ? "p-2 text-lg font-medium w-full bg-black text-white uppercase flex items-center justify-center gap-2"
                  : "p-2 text-lg font-medium w-full bg-black/60 text-white uppercase flex items-center justify-center gap-2"
              }
              onClick={() => (load ? {} : handleAdd())}
            >
              {load && (
                <AiOutlineLoading3Quarters
                  size={18}
                  className=" animate-spin"
                  color="#ffffff"
                />
              )}
              <p>thêm vào giỏ</p>
            </button>
          </div>
        </div>
        <div className="p-4">
          <ul className="flex justify-between border-b px-2">
            <li
              onClick={() => handleSetOptions("des")}
              className={
                options === "des"
                  ? "cursor-pointer hover:text-black   py-1 border-b  text-black"
                  : "cursor-pointer hover:text-black  text-primary-100 py-1 border-b  "
              }
            >
              Mô tả
            </li>
            <li
              onClick={() => handleSetOptions("deli")}
              className={
                options === "deli"
                  ? "cursor-pointer hover:text-black   py-1 border-b  text-black"
                  : "cursor-pointer hover:text-black  text-primary-100 py-1 border-b  "
              }
            >
              Giao hàng và thanh toán
            </li>
            <li
              onClick={() => handleSetOptions("tips")}
              className={
                options === "tips"
                  ? "cursor-pointer hover:text-black   py-1 border-b  text-black"
                  : "cursor-pointer hover:text-black  text-primary-100 py-1 border-b  "
              }
            >
              Tips
            </li>
          </ul>
          {handleGetOptions()}
        </div>
      </div>
    </div>
  );
};

export default Product;
