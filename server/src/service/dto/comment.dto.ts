import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';
import { PostDTO } from './post.dto';
import { UserDTO } from './user.dto';

/**
 * An Comment DTO object.
 */
export class CommentDTO extends BaseDTO {
    @ApiModelProperty({ example: 'My Comment', description: 'Comment content', required: false })
    content?: string;

    @ApiModelProperty({ type: UserDTO, description: 'Comment of user', required: false })
    user?: UserDTO;

    @ApiModelProperty({ type: PostDTO, description: 'Comment of post', required: false })
    post?: PostDTO;
}