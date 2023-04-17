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

interface ISortObject {
  column: string;
  value: "ASC" | "DESC";
}

export { ICommonKeyValue, IJwtUser, ISortObject };
