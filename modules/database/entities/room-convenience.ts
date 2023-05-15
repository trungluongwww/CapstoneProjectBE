import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./base";
import Room from "./room";
import { Convenience } from "./index";

@Entity({ name: "room_conveniences" })
export default class RoomConvenience extends BaseEntity {
  @Column({ name: "room_id", nullable: false, type: "text" })
  roomId: string;

  @ManyToOne(() => Room, (room) => room.id)
  @JoinColumn({ name: "room_id" })
  room: Room;

  @Column({ name: "convenience_id", nullable: false, type: "text" })
  convenienceId: string;

  @ManyToOne(() => Convenience, (conv) => conv.id)
  @JoinColumn({ name: "convenience_id" })
  convenience: Convenience;
}
