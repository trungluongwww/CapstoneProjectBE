interface ICommonKeyValue {
  key: string;
  value: string;
  option?: string;
  isDefault?: boolean;
}

interface IJwtUser {
  id: string;
  name: string;
  type: string;
  phone: string;
}

interface ISortObject {
  column: string;
  value: "ASC" | "DESC";
}

export { ICommonKeyValue, IJwtUser, ISortObject };
