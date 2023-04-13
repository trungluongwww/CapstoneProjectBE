import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from "typeorm";
import pmongo from "../../../external_node/ultils/pmongo";

@Entity()
export default class BaseEntity {
  @PrimaryColumn({
    type: "text",
  })
  id: string;

  @Column({
    name: "created_at",
    type: "timestamp with time zone",
  })
  createdAt: Date;

  @Column({
    name: "updated_at",
    type: "timestamp with time zone",
  })
  updatedAt: Date;

  @BeforeInsert()
  setTime() {
    if (!this.id) {
      this.id = pmongo.newStringId();
    }
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
