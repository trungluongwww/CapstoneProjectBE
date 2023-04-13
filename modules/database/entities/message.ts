import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "./base";
import Province from "./province";
import { JoinColumn } from "typeorm";
import { Conversation, User } from "./index";
import { IUploadSingleFileResponse } from "../../../internal/interfaces/upload";

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

  @Column({ name: "room_id", nullable: false, type: "text" })
  roomId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.id, {
    nullable: false,
  })
  @JoinColumn({ name: "conversation_id" })
  conversation: Conversation;

  @Column({ name: "conversation_id", nullable: false, type: "text" })
  conversationId: string;
}
