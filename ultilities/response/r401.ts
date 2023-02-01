import { Response } from "express";

export default (res: Response, message: string = "chưa xác thực") => {
  return res.status(401).json({ message });
};
