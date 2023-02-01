import { Column, Entity } from "typeorm";
import BaseEntity from "./base";

@Entity("wards")
export default class Ward extends BaseEntity {
  @Column({
    name: "ward_id",
    type: "varchar",
  })
  wardId: string;

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
