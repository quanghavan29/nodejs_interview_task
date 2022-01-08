import {
    Body,
    Controller,
    Logger,
    Post,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { CommentDTO } from '../../service/dto/comment.dto';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CommentService } from '../../service/comment.service';

@Controller('api/comment')
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiUseTags('comment-resource')
export class CommentController {
    logger = new Logger('CommentController');

    constructor(private readonly commentService: CommentService) { }

    @Post('/create-new-comment')
    @ApiOperation({ title: 'Create comment' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CommentDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createComment(@Body() commentDTO: CommentDTO): Promise<CommentDTO | undefined> {
        const commentCreated = await this.commentService.save(commentDTO);

        return commentCreated;
    }

}
