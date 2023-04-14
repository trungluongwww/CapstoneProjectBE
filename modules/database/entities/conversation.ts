import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "./base";
import { User } from "./index";

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
}
