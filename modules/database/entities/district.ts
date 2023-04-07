import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "./base";
import Province from "./province";
import { JoinColumn } from "typeorm";
import { Ward } from "./index";

@Entity({ name: "districts" })
export default class District extends BaseEntity {
  @Column({ name: "province_id", nullable: false, type: "text" })
  provinceId: string;

  @Column({ name: "name", type: "text", nullable: false, default: "" })
  name: string;

  @Column({ name: "code", type: "text", nullable: false, default: "" })
  code: string;
}
