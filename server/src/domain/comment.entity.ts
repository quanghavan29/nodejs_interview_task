import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('comment')
export class Comment extends BaseEntity {
    @Column({ nullable: true })
    content?: string;

    @ManyToOne(() => User, user => user.posts)
    user?: User;

    @ManyToOne(() => Post, post => post.comments)
    post?: Post;

}
