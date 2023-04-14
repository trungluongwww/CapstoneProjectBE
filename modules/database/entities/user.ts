import BaseEntity from "./base";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { District, Province, Ward } from "./index";

@Entity({ name: "users" })
export default class User extends BaseEntity {
  @Column({ name: "username", type: "text", nullable: false, default: "" })
  username: string;

  @Column({ name: "password", type: "text", nullable: false, default: "" })
  password: string;

  @Column({ name: "phone", type: "text", nullable: false, default: "" })
  phone: string;

  @Column({ name: "email", nullable: false, type: "text", default: "" })
  email: string;

  @Column({ name: "zalo", nullable: false, type: "text", default: "" })
  zalo: string;

  @Column({ name: "facebook", nullable: false, type: "text", default: "" })
  facebook: string;

  @Column({ name: "name", nullable: false, type: "text", default: "" })
  name: string;

  @Column({ name: "avatar", nullable: false, type: "text", default: "" })
  avatar: string;

  @Column({ name: "search_text", nullable: false, type: "text", default: "" })
  searchText: string;

  @Column({ name: "province_id", nullable: true, type: "text" })
  provinceId: string;

  @ManyToOne(() => Province, (province) => province.id)
  @JoinColumn({ name: "province_id" })
  province: Province;

  @Column({ name: "district_id", nullable: true, type: "text" })
  districtId: string;

  @ManyToOne(() => District, (district) => district.id)
  @JoinColumn({ name: "district_id" })
  district: District;

  @Column({ name: "ward_id", nullable: true, type: "text" })
  wardId: string;

  @ManyToOne(() => Ward, (ward) => ward.id)
  @JoinColumn({ name: "ward_id" })
  ward: Ward;

  @Column({ name: "address", nullable: false, default: "", type: "text" })
  address: string;

  @Column({ name: "root", nullable: false, default: false, type: "boolean" })
  root: boolean;
}
