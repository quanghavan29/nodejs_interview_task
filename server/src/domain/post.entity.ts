import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity('post')
export class Post extends BaseEntity {
    @Column({ nullable: true })
    content?: string;
    
    @ManyToOne(() => User, user => user.posts)
    user?: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments?: Comment[];
}
