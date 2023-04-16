import { Column, Entity, JoinColumn, ManyToOne, OneToMany, VirtualColumn } from "typeorm";
import BaseEntity from "./base";
import { User } from "./index";
import Message from "./message";

@Entity({ name: "conversations" })
export default class Conversation extends BaseEntity {
  @Column({ name: "owner_id", nullable: false, type: "text" })
  ownerId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @Column({ name: "participant_id", nullable: false, type: "text" })
  participantId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "participant_id" })
  participant: User;

  @Column({ name: "last_sender_id", nullable: false, default: "", type: "text" })
  lastSenderId: string;

  @Column({ name: "unread", nullable: false, default: 0, type: "integer" })
  unread: number;

  @VirtualColumn({
    query: (alias) => `select json_build_object('id', m.id, 'content', m.content, 'type', m.type, 'createdAt',
                                                m.created_at, 'updatedAt', m.updated_at, 'authorId', m.author_id)
                       from messages m
                       where m.conversation_id = ${alias}.id
                       order by m.created_at desc limit 1`,
  })
  lastMessage: Message;
}
