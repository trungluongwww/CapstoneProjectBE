import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "./base";
import Room from "./room";

@Entity({ name: "room_files" })
export default class RoomFile extends BaseEntity {
  @Column({ name: "room_id", nullable: false, type: "text" })
  roomId: string;

  @Column({ name: "origin_name", nullable: false, default: "", type: "text" })
  originName: string;

  @Column({ name: "name", nullable: false, default: "", type: "text" })
  name: string;

  @Column({ name: "url", nullable: false, default: "", type: "text" })
  url: string;

  @Column({ name: "type", nullable: false, default: "", type: "text" })
  type: string;

  @ManyToOne(() => Room, (room) => room.id)
  room: Room;
}
