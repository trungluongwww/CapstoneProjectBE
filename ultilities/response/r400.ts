import { Response } from "express";

export default (
  res: Response,
  data: any = null,
  message: string = "thất bại"
) => {
  return res.status(400).json({ data, message });
};
