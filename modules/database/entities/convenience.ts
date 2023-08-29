import { Column, Entity } from "typeorm";
import BaseEntity from "./base";

@Entity({ name: "conveniences" })
export default class Convenience extends BaseEntity {
  @Column({ name: "name", type: "text", nullable: false })
  name: string;

  @Column({ name: "code", type: "text", nullable: false })
  code: string;

  @Column({ name: "order", type: "integer", nullable: false, default: 0 })
  order: number;
}
