import { Column, Entity, OneToMany } from "typeorm";
import BaseEntity from "./base";
import { District } from "./index";
import User from "./user";

@Entity({ name: "provinces" })
export default class Province extends BaseEntity {
  @Column({ name: "name", nullable: false, default: "", type: "text" })
  name: string;

  @Column({ name: "code", nullable: false, default: "", type: "text" })
  code: string;
}
