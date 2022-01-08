import { Module } from '@nestjs/common';
import { PostController } from '../web/rest/post.controller';
import { ManagementController } from '../web/rest/management.controller';
import { PostRepository } from '../repository/post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from '../service/post.service';
import { CommentModule } from './comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository]),
    CommentModule
  ],
  controllers: [PostController, ManagementController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
