interface IUserCreatePayload {
  username: string;
  password: string;
  phone: string;
  name: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  address: string;
}

interface IUserUpdatePayload {
  name: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  address: string;
  facebook: string;
  zalo: string;
  avatar: string;
  email: string;
}

export { IUserCreatePayload, IUserUpdatePayload };
