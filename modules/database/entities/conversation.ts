import { Entity, OneToMany } from "typeorm";
import BaseEntity from "./base";
import ConversationUser from "./conversation-user";

@Entity({ name: "conversations" })
export default class Conversation extends BaseEntity {
  @OneToMany(
    () => ConversationUser,
    (conversationUser) => conversationUser.conversation
  )
  users: ConversationUser[];
}
