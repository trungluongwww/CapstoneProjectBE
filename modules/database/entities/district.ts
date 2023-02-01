import { Column, Entity } from "typeorm";
import BaseEntity from "./base";

@Entity("districts")
export default class District extends BaseEntity {
  @Column({
    name: "province_id",
    type: "int",
  })
  provinceId: number;

  @Column({
    name: "district_id",
    type: "int",
  })
  districtId: number;

  @Column({
    name: "name",
    type: "text",
  })
  name: string;
}
