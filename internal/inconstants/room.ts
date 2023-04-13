import { ICommonKeyValue } from "../interfaces/common";

export default {
  status: {
    active: "active",
    inactive: "inactive",
    banned: "banned",
    all: ["active", "inactive", "banned"],
  },
  sortField: {
    createdAt: "createdAt",
    price: "price",
    all: ["createdAt", "price"],
  },
  type: {
    full: "full",
    shared: "shared",
    all: ["full", "shared"],
  },
  getObjectStatus: (status: string): ICommonKeyValue => {
    let value: string;
    switch (status) {
      case "banned":
        value = "Đã bị admin khóa";
        break;
      case "active":
        value = "Đang cho thuê";
        break;
      case "inactive":
        value = "Tạm ngưng";
        break;
      default:
        value = "";
        break;
    }

    return {
      value: value,
      key: status,
    } as ICommonKeyValue;
  },
  getObjectType: (type: string): ICommonKeyValue => {
    let value: string;
    switch (type) {
      case "full":
        value = "Nguyên căn hộ";
        break;
      case "shared":
        value = "Phòng trọ";
        break;
      default:
        value = "";
        break;
    }

    return {
      value: value,
      key: type,
    } as ICommonKeyValue;
  },
};
