interface ICommonKeyValue {
  key: string;
  value: String;
}

interface IJwtUser {
  id: string;
  name: string;
  type: string;
  phone: string;
}

export { ICommonKeyValue, IJwtUser };
