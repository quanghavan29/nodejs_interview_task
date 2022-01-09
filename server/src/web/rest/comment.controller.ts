import {
    Body,
    Controller,
    Logger,
    Post,
    UseInterceptors,
    ClassSerializerInterceptor,
    Delete,
    Param,
    Get,
    Put,
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

    
    @Get('/get-all')
    @ApiOperation({ title: 'Get the list of comments' })
    @ApiResponse({
        status: 200,
        description: 'List all comments',
        type: CommentDTO,
    })
    async getAllComments(): Promise<CommentDTO[] | undefined> {
        const results = await this.commentService.findAll();

        return results;
    }

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

    @Put('/update-comment')
    @ApiOperation({ title: 'Update comment' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CommentDTO,
    })
    async commentPost(@Body() commentDTO: CommentDTO): Promise<CommentDTO | undefined> {
        const commentUpdated = await this.commentService.update(commentDTO);

        return commentUpdated;
    }

    @Delete('/delete-comment/:commentId')
    @ApiOperation({ title: 'Delete comment' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
        type: CommentDTO,
    })
    async deleteComment(@Param('commentId') commentId: number): Promise<CommentDTO | undefined> {
        const commetToDelete = await this.commentService.findById(commentId);

        return await this.commentService.delete(commetToDelete);
    }


}
