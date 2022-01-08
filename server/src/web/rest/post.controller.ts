import {
    Body,
    Controller,
    Get,
    Logger,
    Post,
    Req,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { PostDTO } from '../../service/dto/post.dto';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { PostService } from '../../service/post.service';
import { CommentService } from '../../service/comment.service';

@Controller('api/post')
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiUseTags('post-resource')
export class PostController {
    logger = new Logger('PostController');

    constructor(private readonly postService: PostService,
        private readonly commentService: CommentService) { }

    @Get('/get-all')
    @ApiOperation({ title: 'Get the list of posts' })
    @ApiResponse({
        status: 200,
        description: 'List all posts',
        type: PostDTO,
    })
    async getAllPosts(@Req() req: Request): Promise<PostDTO[] | undefined> {
        const results = await this.postService.findAll();
        for (let post of results) {
            const commentsOfPost = await this.commentService.findAllByPost(post.id);
            post.comments = commentsOfPost;
        }

        return results;
    }

    @Post('/create-new-post')
    @ApiOperation({ title: 'Create post' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: PostDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createPost(@Body() postDTO: PostDTO): Promise<PostDTO | undefined> {
        const postCreated = await this.postService.save(postDTO);

        return postCreated;
    }

}
