import { Post } from '../../domain/post.entity';
import { PostDTO } from '../dto/post.dto';

/**
 * An Post mapper object.
 */
export class PostMapper {
  static fromDTOtoEntity(postDTO: PostDTO): Post {
    if (!postDTO) {
      return;
    }
    let post = new Post();
    const fields = Object.getOwnPropertyNames(postDTO);
    fields.forEach(field => {
      post[field] = postDTO[field];
    });
    return post;
  }

  static fromEntityToDTO(post: Post): PostDTO {
    if (!post) {
      return;
    }
    let postDTO = new PostDTO();

    const fields = Object.getOwnPropertyNames(post);

    fields.forEach(field => {
      postDTO[field] = post[field];
    });

    return postDTO;
  }
}
