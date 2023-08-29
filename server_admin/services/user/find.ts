import { IUserAllQuery, IUserAllResponse, IUserQueryCondition, IUserResponse } from "../../../internal/interfaces/user";
import inconstants from "../../../internal/inconstants";
import dao from "../../dao";
import { User } from "../../../modules/database/entities";
import times from "../../../external_node/ultils/times";
import services from "../../../server_admin/services";

const convertModelToResponse = (user: User): IUserResponse => {
  if (!user) {
    return {} as IUserResponse;
  }

  return {
    id: user.id,
    phone: user.phone,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    createdAt: times.newDateTimeUTC7(user.createdAt),
    updatedAt: times.newDateTimeUTC7(user.updatedAt),
    address: user.address,
    root: user.root,
    province: services.location.find.convertProvinceModelToResponse(user.province),
    district: services.location.find.convertDistrictModelToResponse(user.district),
    ward: services.location.find.convertWardModelToResponse(user.ward),
  } as IUserResponse;
};

const all = async (query: IUserAllQuery): Promise<IUserAllResponse> => {
  const cond = {
    limit: 20,
    offset: query.page * 20,
    wardId: query.wardId,
    districtId: query.districtId,
    searchText: query.searchText,
    provinceId: query.provinceId,
    sort: [{ value: "DESC", column: inconstants.user.sortColumns.createdAt }],
  } as IUserQueryCondition;

  const [docs] = await dao.user.find.allByCondition(cond);
  const [total] = await dao.user.find.countByCondition(cond);

  const users = docs.map((doc) => convertModelToResponse(doc));

  return {
    users: users,
    total: total,
  } as IUserAllResponse;
};

export default {
  all,
  convertModelToResponse,
};
