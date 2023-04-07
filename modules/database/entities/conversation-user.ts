import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "./base";
import { JoinColumn } from "typeorm";
import { Conversation } from "./index";
import { User } from "./index";

@Entity({ name: "conversation_users" })
export default class ConversationUser extends BaseEntity {
  @Column({ name: "conversation_id", type: "text", nullable: false })
  conversationId: string;

  @Column({ name: "user_id", type: "text", nullable: false })
  userId: string;

  @Column({ name: "unread", type: "integer", default: 0 })
  unread: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Conversation, (covnersation) => covnersation.id)
  @JoinColumn({ name: "conversation_id" })
  conversation: Conversation;
}
