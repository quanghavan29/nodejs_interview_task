import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDTO } from './dto/post.dto';
import { PostMapper } from './mapper/post.mapper';
import { PostRepository } from '../repository/post.repository';

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostRepository) private postRepository: PostRepository) { }

    async findAll(): Promise<PostDTO[] | undefined> {
        const results = await this.postRepository.find({ relations: ['user', 'comments'] });
        const postsDTO: PostDTO[] = [];
        results.forEach(postEntity => {
            postsDTO.push(PostMapper.fromEntityToDTO(postEntity));
        });

        return postsDTO;
    }

    async save(postDTO: PostDTO): Promise<PostDTO | undefined> {
        const newPost = PostMapper.fromDTOtoEntity(postDTO);
        const postCreated = await this.postRepository.save(newPost);

        return PostMapper.fromEntityToDTO(postCreated);
    }

}
