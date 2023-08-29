import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "./base";
import Province from "./province";
import { JoinColumn } from "typeorm";
import { Conversation, User } from "./index";
import { IUploadSingleFileResponse } from "../../../internal/interfaces/upload";
import Room from "./room";

@Entity({ name: "messages" })
export default class Message extends BaseEntity {
  @Column({ name: "author_id", nullable: false, type: "text" })
  authorId: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: "author_id" })
  author: User;

  @Column({ name: "content", nullable: false, default: "", type: "text" })
  content: string;

  @Column({ name: "type", nullable: false, default: "", type: "text" })
  type: string;

  @Column({ name: "file", type: "jsonb", nullable: true })
  file: IUploadSingleFileResponse;

  @Column({ name: "room_id", nullable: true, type: "text" })
  roomId: string;

  @ManyToOne(() => Room, (room) => room.id, {
    nullable: false,
  })
  @JoinColumn({ name: "room_id" })
  room: Room;

  @ManyToOne(() => Conversation, (conversation) => conversation.id, {
    nullable: false,
  })
  @JoinColumn({ name: "conversation_id" })
  conversation: Conversation;

  @Column({ name: "conversation_id", nullable: false, type: "text" })
  conversationId: string;
}
