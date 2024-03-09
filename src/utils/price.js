const convert_price = (price) => {
  //   const formatter = new Intl.NumberFormat("vi-VN", {
  //     style: "currency",
  //     currency: "VND",
  //     currencyDisplay: 'none', // Use narrow symbol, empty string for no symbol
  //   });

  //   return formatter.format(price).replaceAll(".", ",").trim();
  price = price.toLocaleString("vi-VN").replace(/\./g, ",").slice(0, -3);
  return Number(price) > 0 ? price + "000" : 0;
};

const get_sum = (items) => {
  let sum = 0;
  items.forEach((element) => {
    sum += element.quantity * element.product.price.replaceAll(",", "");
  });
  return convert_price(sum);
};
export { convert_price, get_sum };
