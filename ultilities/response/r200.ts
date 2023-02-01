import { Response } from "express";

export default (
  res: Response,
  data: any = {},
  message: string = "thành công"
) => {
  return res.status(200).json({ data, message });
};
