import React, { useEffect, useState } from "react";
import { getProductBySlug } from "@/apollo/queries";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import Image from "next/image";
const optionsChoice = {
  description: "des",
  deliveryAndpayment: "deli",
  tips: "tips",
};

const Product = () => {
  const currentPathname = usePathname();
  const [options, setOptions] = useState(optionsChoice.description);
  const handleSetOptions = (choice) => {
    setOptions(choice);
  };
  const { loading, error, data } = useQuery(getProductBySlug, {
    variables: { slug: currentPathname.replace("/p/", "") },
  });
  const rs = data;
  console.log(rs);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (data) setProduct(data.getProductBySlug);
  }, [data]);

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
          <div class="p-2 sm:p-4 sm:mt-5 ">
            <h3 class="capitalize font-semibold">chính sách giao hàng</h3>
            <table class="table-auto border-collapse border border-slate-500 mt-2">
              <thead>
                <tr>
                  <th class="border uppercase text-xs p-2">khu vực</th>
                  <th class="border uppercase text-xs p-2">phí giao hàng</th>
                  <th class="border uppercase text-xs p-2">
                    thời gian vận chuyển
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border p-2">
                    Nội thành Hà Nội &amp; TP. Hồ Chí Minh
                  </td>
                  <td class="border p-2">Đồng giá 30.000Đ</td>
                  <td class="border p-2">1-2 ngày làm việc.</td>
                </tr>
                <tr>
                  <td class="border p-2">
                    Ngoại thành Hà Nội &amp; TP. Hồ Chí Minh
                  </td>
                  <td class="border p-2">Đồng giá 30.000Đ</td>
                  <td class="border p-2">3-7 ngày làm việc.</td>
                </tr>
                <tr>
                  <td class="border p-2">Các tỉnh thành khác</td>
                  <td class="border p-2">Đồng giá 30.000Đ </td>
                  <td class="border p-2">5-7 ngày làm việc.</td>
                </tr>
              </tbody>
            </table>
            <h3 class="capitalize font-semibold mt-4">chính sách thanh toán</h3>
            <p>
              Khách hàng mua hàng tại SSSTUTTER có thể thanh toán bằng 3 hình
              thức sau:
            </p>
            <ul class="list-decimal px-4 py-2">
              <li class="text-xs p-2">
                Trả tiền khi nhận hàng (COD): khi nhận được hàng, người nhận
                hàng sẽ thanh toán trực tiếp cho người giao hàng. Khoản thanh
                toán bao gồm tiền hàng và phí giao hàng cho vận chuyển.
              </li>
              <li class="text-xs p-2">Thanh toán qua ví ShopeePay.</li>
              <li class="text-xs p-2">
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
          <div class="p-4 sm:p-2 ">
            <h3 class="capitalize font-semibold mt-4">bảo quản</h3>
            <p>*Lưu ý</p>
            <ul class="list-decimal px-4 py-2">
              <li class="text-xs p-2">
                Không để quần áo ở nơi ẩm và nên giặt ngay sau khi sử dụng để
                tránh ẩm mốc
              </li>
              <li class="text-xs p-2">
                Không giặt chung áo trắng với quần áo màu
              </li>
              <li class="text-xs p-2">
                Không nên giặt trong nước nóng quá 40 độ để tránh bị giãn và mất
                form
              </li>
              <li class="text-xs p-2">
                Không đổ trực tiếp bột giặt lên quần áo khi giặt để tránh bị
                phai và loang màu
              </li>
              <li class="text-xs p-2">
                Không ngâm trong xà phòng quá lâu để tránh bạc màu
              </li>
            </ul>
            <p>*Mẹo giữ quần áo lâu mới</p>
            <ul class="list-decimal px-4 py-2">
              <li class="text-xs p-2">
                Nên giặt áo bằng nước lạnh hoặc nước hơi ấm, nước nóng sẽ làm
                vải áo giãn ra
              </li>
              <li class="text-xs p-2">
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
        <div className="w-full border-b sm:border-none">
          <div className="w-full sm:grid sm:grid-cols-4  gap-2 overflow-auto">
            <div className="hidden sm:block">
              <div className=" grid  grid-cols-1 gap-2">
                {product &&
                  product.colors[0].images.map((item, index) => {
                    if (index < 3)
                      return (
                        <Image
                          key={index}
                          className="aspect-[4/5] object-cover brightness-50 hover:brightness-100"
                          src={item}
                          alt=""
                        />
                      );
                  })}
              </div>
            </div>
            <div className="w-full col-span-3">
              {product && (
                <Image
                  className="aspect-[4/5] object-cover"
                  src={product.colors[0].images[0]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:col-span-1 relative">
        <div className="p-4">
          <div className="hidden sm:block">
            <h1 className="uppercase text-2xl">{product && product.title}</h1>
            <div className="flex items-center sm:my-4 gap-10 sm:w-full ">
              <h5 class="text-warning text-3xl font-semibold">
                {product && product.price}
              </h5>
              <p class=" text-3xl font-semibold line-through text-primary-300">
                {product && product.cost}
              </p>
            </div>
          </div>
          <div className="py-2">
            <h4 class="text-center justify-center items-center sm:justify-start capitalize mb-2 flex gap-2">
              chọn màu : <p class="font-semibold"></p>
            </h4>
            <div className="flex justify-center items-center sm:justify-start flex-wrap gap-4">
              {product &&
                product.colors.map((item, index) => {
                  return (
                    <div key={index} className="basis-1/5">
                      <button className="w-full transition-all border disabled:grayscale border-secondary">
                        <Image src={item.mark} className="square border" alt="" />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <div class="py-2">
            <div class="flex justify-between items-center">
              <h4 class="text-center capitalize sm:text-left">chọn size</h4>
              <h5 class="border-b border-primary-500 flex items-center gap-2 cursor-pointer">
                Bảng size{" "}
                <svg width="20" height="20" viewBox="0 0 256 256">
                  <path
                    fill="currentColor"
                    d="M232 76.7L179.3 24a16.1 16.1 0 0 0-22.6 0L90.3 90.3l-36 36L24 156.7a15.9 15.9 0 0 0 0 22.6L76.7 232a15.9 15.9 0 0 0 22.6 0L232 99.3a15.9 15.9 0 0 0 0-22.6ZM220.7 88L88 220.7L35.3 168L60 143.3l26.3 26.4a8.2 8.2 0 0 0 11.4 0a8.1 8.1 0 0 0 0-11.4L71.3 132L96 107.3l26.3 26.4a8.2 8.2 0 0 0 11.4 0a8.1 8.1 0 0 0 0-11.4L107.3 96L132 71.3l26.3 26.4a8.2 8.2 0 0 0 11.4 0a8.1 8.1 0 0 0 0-11.4L143.3 60L168 35.3L220.7 88Z"
                  ></path>
                </svg>
              </h5>
            </div>
            <div class="flex justify-center sm:justify-between items-center gap-2">
              <ul class="flex items-center justify-center sm:justify-start gap-5 py-2">
                <li>
                  <button class="w-10 h-10 grid place-content-center border disabled:text-primary-100 border-transparent">
                    <span>0</span>
                  </button>
                </li>
                <li>
                  <button class="w-10 h-10 grid place-content-center border disabled:text-primary-100 border-transparent">
                    <span>1</span>
                  </button>
                </li>
                <li>
                  <button class="w-10 h-10 grid place-content-center border disabled:text-primary-100 border-transparent">
                    <span>2</span>
                  </button>
                </li>
                <li>
                  <button class="w-10 h-10 grid place-content-center border disabled:text-primary-100 border-transparent">
                    <span>3</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="border-t sm:border-none border-primary-100 p-4 z-10 bg-white">
          <div class="flex items-center justify-between sm:hidden">
            <h2 class="uppercase">{product && product.title}</h2>
            <div class="flex items-center gap-2">
              <h3 class=" text-lg line-through text-primary-300">
                {product && product.cost}
              </h3>
              <h3 class="text-warning text-xl">{product && product.price}</h3>
            </div>
          </div>
          <div class="flex justify-between items-center mt-2 gap-4">
            <button
              type="button"
              class="p-2 text-lg font-medium w-full bg-black text-white uppercase"
            >
              thêm vào giỏ
            </button>
          </div>
        </div>
        <div className="p-4">
          <ul class="flex justify-between border-b px-2">
            <li
              onClick={() => handleSetOptions("des")}
              class={
                options === "des"
                  ? "cursor-pointer hover:text-black   py-1 border-b  text-black"
                  : "cursor-pointer hover:text-black  text-primary-100 py-1 border-b  "
              }
            >
              Mô tả
            </li>
            <li
              onClick={() => handleSetOptions("deli")}
              class={
                options === "deli"
                  ? "cursor-pointer hover:text-black   py-1 border-b  text-black"
                  : "cursor-pointer hover:text-black  text-primary-100 py-1 border-b  "
              }
            >
              Giao hàng và thanh toán
            </li>
            <li
              onClick={() => handleSetOptions("tips")}
              class={
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
