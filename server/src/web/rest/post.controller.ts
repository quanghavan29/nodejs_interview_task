import {
    Body,
    Controller,
    Get,
    Logger,
    Post,
    Req,
    UseInterceptors,
    ClassSerializerInterceptor,
    Delete,
    Param,
    Put,
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

    @Get('/get-post-detail/:postId')
    @ApiOperation({ title: 'Get post detail' })
    @ApiResponse({
        status: 200,
        description: 'Post detail',
        type: PostDTO,
    })
    async getPostDetail(@Param('postId') postId: number): Promise<PostDTO | undefined> {
        const postFound = await this.postService.findById(postId);

        return postFound;
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

    @Put('/update-post')
    @ApiOperation({ title: 'Update post' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: PostDTO,
    })
    async updatePost(@Body() postDTO: PostDTO): Promise<PostDTO | undefined> {
        const postUpdated = await this.postService.update(postDTO);

        return postUpdated;
    }

    @Delete('/delete-post/:postId')
    @ApiOperation({ title: 'Delete post' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
        type: PostDTO,
    })
    async deletePost(@Param('postId') postId: number): Promise<PostDTO> {
        const postToDelete = await this.postService.findById(postId);

        return await this.postService.delete(postToDelete);
    }

}
