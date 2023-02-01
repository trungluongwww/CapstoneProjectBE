import { Column, Entity } from "typeorm";
import BaseEntity from "./base";

@Entity("provinces")
export default class Province extends BaseEntity {
  @Column({
    name: "province_id",
    type: "int",
  })
  provinceId: number;

  @Column({
    name: "name",
    type: "text",
  })
  name: string;
}
