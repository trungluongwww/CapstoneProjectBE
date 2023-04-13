import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./base";
import Room from "./room";
import { IUploadSingleFileResponse } from "../../../internal/interfaces/upload";

@Entity({ name: "room_files" })
export default class RoomFile extends BaseEntity {
  @Column({ name: "room_id", nullable: false, type: "text" })
  roomId: string;

  @Column({ name: "info", nullable: false, type: "jsonb" })
  info: IUploadSingleFileResponse;

  @ManyToOne(() => Room, (room) => room.id)
  @JoinColumn({ name: "room_id" })
  room: Room;
}
