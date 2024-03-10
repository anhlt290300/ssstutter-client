const convert_price = (price) => {
  //   const formatter = new Intl.NumberFormat("vi-VN", {
  //     style: "currency",
  //     currency: "VND",
  //     currencyDisplay: 'none', // Use narrow symbol, empty string for no symbol
  //   });

  //   return formatter.format(price).replaceAll(".", ",").trim();
  price = price.toLocaleString("vi-VN").replace(/\./g, ",");
  return Number(price.slice(0, -3)) > 0 ? price.slice(0, -3) + "000" : price;
};

const get_sum = (items) => {
  let sum = 0;
  items.forEach((element) => {
    sum += element.quantity * element.product.price.replaceAll(",", "");
  });
  return convert_price(sum);
};
export { convert_price, get_sum };
