import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';
import { CommentDTO } from './comment.dto';
import { UserDTO } from './user.dto';

/**
 * An Post DTO object.
 */
export class PostDTO extends BaseDTO {
    @ApiModelProperty({ example: 'My Post', description: 'Post content', required: false })
    content?: string;

    @ApiModelProperty({ type: UserDTO, description: 'Article owner', required: false })
    user?: UserDTO;

    @ApiModelProperty({
        isArray: true,
        description: 'Array of comments',
        required: false,
    })
    comments?: CommentDTO[];
}