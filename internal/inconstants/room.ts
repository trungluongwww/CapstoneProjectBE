import { ICommonKeyValue } from "../interfaces/common";

export default {
  freeAccountMaxNumOfRoom: 10,
  maxSquareMeter: 500,
  maxRentPerMonth: 100000000,
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
    apartment: "apartment",
    house: "house",
    room: "room",
    share: "share",
    all: ["apartment", "house", "room", "share"],
  },
  getObjectStatus: (status: string): ICommonKeyValue => {
    let value: string;
    switch (status) {
      case "banned":
        value = "Đã bị admin khóa";
        break;
      case "active":
        value = "Đang tìm người thuê";
        break;
      case "inactive":
        value = "Đã có người thuê";
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
      case "apartment":
        value = "Căn hộ";
        break;
      case "house":
        value = "Toàn bộ nhà ở";
        break;
      case "room":
        value = "Phòng trọ";
        break;
      case "share":
        value = "Tìm người ở ghép";
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
