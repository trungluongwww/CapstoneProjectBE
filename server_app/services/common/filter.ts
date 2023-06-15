import { ICommonKeyValue } from "../../../internal/interfaces/common";
import inconstants from "../../../internal/inconstants";

interface IFilterAll {
  room: IFilterRoom;
}

interface IFilterRoom {
  types: Array<ICommonKeyValue>;
  sort: Array<ICommonKeyValue>;
}

const all = (): IFilterAll => {
  return {
    room: {
      sort: [
        {
          key: inconstants.room.sortField.price,
          value: "Giá tăng dần",
          option: inconstants.common.sortValue.asc,
          isDefault: false,
        },
        {
          key: inconstants.room.sortField.price,
          value: "Giá giảm dần",
          option: inconstants.common.sortValue.desc,
          isDefault: false,
        },
        {
          key: inconstants.room.sortField.createdAt,
          value: "Mới nhất",
          option: inconstants.common.sortValue.desc,
          isDefault: true,
        },
        {
          key: inconstants.room.sortField.createdAt,
          value: "Cũ nhất",
          option: inconstants.common.sortValue.asc,
          isDefault: false,
        },
      ],
      types: [
        {
          key: inconstants.room.type.room,
          value: "Phòng trọ",
          isDefault: true,
        },
        {
          key: inconstants.room.type.apartment,
          value: "Căn hộ",
          isDefault: false,
        },
        {
          key: inconstants.room.type.house,
          value: "Nhà",
          isDefault: false,
        },
        {
          key: inconstants.room.type.share,
          value: "Ở ghép",
          isDefault: false,
        },
      ],
    },
  } as IFilterAll;
};

export default {
  all,
};
