import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./base";
import Room from "./room";
import { User } from "./index";

@Entity({ name: "user_room_histories" })
export default class UserRoomHistory extends BaseEntity {
  @Column({ name: "room_id", nullable: false, type: "text" })
  roomId: string;

  @ManyToOne(() => Room, (room) => room.id)
  @JoinColumn({ name: "room_id" })
  room: Room;

  @Column({ name: "user_id", nullable: false, type: "text" })
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "action", nullable: false, default: "", type: "text" })
  action: string;
}
