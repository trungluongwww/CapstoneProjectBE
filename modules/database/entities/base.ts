import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export default class BaseEntity {
  @PrimaryColumn({})
  id: string;

  @Column({
    name: "created_at",
    type: "timestamp with time zone",
  })
  createdAt: Date;

  @Column({
    name: "created_at_number",
    type: "bigint",
  })
  createdAtNumber: number;

  @Column({
    name: "updated_at",
    type: "timestamp with time zone",
  })
  updatedAt: Date;

  @Column({
    name: "updated_at_number",
    type: "bigint",
  })
  updatedAtNumber: number;

  @BeforeInsert()
  setId() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
      this.createdAtNumber = Date.parse(this.createdAt.toString());
    }
    if (!this.updatedAt) {
      this.updatedAt = new Date();
      this.updatedAtNumber = Date.parse(this.updatedAt.toString());
    }
  }
  @BeforeUpdate()
  setTime() {
    this.updatedAt = new Date();
  }
}
