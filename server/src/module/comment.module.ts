import { Module } from '@nestjs/common';
import { CommentController } from '../web/rest/comment.controller';
import { ManagementController } from '../web/rest/management.controller';
import { CommentRepository } from '../repository/comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from '../service/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentController, ManagementController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
