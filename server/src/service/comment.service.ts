import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDTO } from './dto/comment.dto';
import { CommentMapper } from './mapper/comment.mapper';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class CommentService {
    constructor(@InjectRepository(CommentRepository) private commentRepository: CommentRepository) { }

    async findAll(): Promise<CommentDTO[] | undefined> {
        const results = await this.commentRepository.find();
        const commentsDTO: CommentDTO[] = [];
        results.forEach(commentEntity => {
            commentsDTO.push(CommentMapper.fromEntityToDTO(commentEntity));
        });

        return commentsDTO;
    }

    async findAllByPost(commentId: number): Promise<CommentDTO[] | undefined> {
        const results = await this.commentRepository.find({
            relations: ['user'],
            where: {
                post: {
                    id: commentId,
                }
            }
        });
        const commentsDTO: CommentDTO[] = [];
        results.forEach(commentEntity => {
            commentsDTO.push(CommentMapper.fromEntityToDTO(commentEntity));
        });

        return commentsDTO;
    }

    async findById(commentId: number): Promise<CommentDTO | undefined> {
        const commentFound = await this.commentRepository.findOne({ id: commentId });

        return CommentMapper.fromEntityToDTO(commentFound);
    }

    async save(commentDTO: CommentDTO): Promise<CommentDTO | undefined> {
        const newComment = CommentMapper.fromDTOtoEntity(commentDTO);
        const commentCreated = await this.commentRepository.save(newComment);

        return CommentMapper.fromEntityToDTO(commentCreated);
    }

    async update(commentDTO: CommentDTO): Promise<CommentDTO | undefined> {
        const commentToUpdate = CommentMapper.fromDTOtoEntity(commentDTO);
        const commentUpdated = await this.commentRepository.save(commentToUpdate);

        return CommentMapper.fromEntityToDTO(commentUpdated);
    }

    async delete(commentDTO: CommentDTO): Promise<CommentDTO | undefined> {
        const commentToDelete = CommentMapper.fromDTOtoEntity(commentDTO);

        const commentDeleted = await this.commentRepository.remove(commentToDelete);

        return CommentMapper.fromEntityToDTO(commentDeleted);
    }

}
