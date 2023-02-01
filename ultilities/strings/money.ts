const convertToMoneyString = (n: number | undefined): string => {
  if (!n) return "đ 0";
  const rs = n.toLocaleString("vn-VN", {
    style: "currency",
    currency: "VND",
  });
  return rs;
};

export default {
  convertToMoneyString,
};
