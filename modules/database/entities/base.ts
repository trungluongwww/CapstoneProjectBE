import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

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
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
