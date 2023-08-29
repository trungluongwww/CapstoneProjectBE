import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./base";
import { District } from "./index";

@Entity({ name: "wards" })
export default class Ward extends BaseEntity {
  @Column({ name: "district_id" })
  districtId: string;

  @Column({ name: "name", nullable: true })
  name: string;

  @Column({ name: "code", nullable: true })
  code: string;
}
