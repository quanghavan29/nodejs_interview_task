import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDTO } from './dto/comment.dto';
import { CommentMapper } from './mapper/comment.mapper';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class CommentService {
    constructor(@InjectRepository(CommentRepository) private commentRepository: CommentRepository) { }

    async findAllByPost(postId: number): Promise<CommentDTO[] | undefined> {
        const results = await this.commentRepository.find({ 
            relations: ['user'], 
            where: {
                post: {
                    id: postId,
                }
            }
        });
        const commentsDTO: CommentDTO[] = [];
        results.forEach(commentEntity => {
            commentsDTO.push(CommentMapper.fromEntityToDTO(commentEntity));
        });

        return commentsDTO;
    }


    async save(commentDTO: CommentDTO): Promise<CommentDTO | undefined> {
        const newComment = CommentMapper.fromDTOtoEntity(commentDTO);
        const commentCreated = await this.commentRepository.save(newComment);

        return CommentMapper.fromEntityToDTO(commentCreated);
    }

}
