import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "./base";
import RoomFile from "./room-file";
import { User } from "./index";

@Entity({ name: "rooms" })
export default class Room extends BaseEntity {
  @Column({ name: "user_id", nullable: false, type: "text" })
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ name: "name", nullable: false, default: "", type: "text" })
  name: string;

  @Column({ nullable: true, name: "description", type: "text", default: "" })
  description: string;

  @Column({
    nullable: true,
    name: "rent_per_month",
    type: "integer",
    default: 0,
  })
  rentPerMonth: number;

  @Column({
    nullable: true,
    name: "deposit",
    type: "integer",
    default: 0,
  })
  deposit: number;

  @Column({
    nullable: true,
    name: "square_metre",
    type: "integer",
    default: 0,
  })
  squareMetre: number;

  @Column({ name: "province_id", nullable: true, type: "text" })
  provinceId: string;

  @Column({ name: "district_id", nullable: true, type: "text" })
  districtId: string;

  @Column({ name: "ward_id", nullable: true, type: "text" })
  wardId: string;

  @Column({ name: "address", nullable: false, default: "", type: "text" })
  address: string;

  @Column({ name: "search_text", nullable: false, default: "", type: "text" })
  searchText: string;

  @Column({ name: "status", nullable: false, default: "", type: "text" })
  status: string;

  @Column({
    name: "recent_active_at",
    nullable: false,
    default: new Date(),
    type: "timestamp with time zone",
  })
  recentActiveAt: Date;

  @OneToMany(() => RoomFile, (roomFile) => roomFile.room)
  files: RoomFile[];
}
