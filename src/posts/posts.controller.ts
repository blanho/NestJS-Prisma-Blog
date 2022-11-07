import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostQueryDto } from './dto/query-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() { sub }, @Body() createPostDto: CreatePostDto) {
    const categories = createPostDto.categories?.map((category) => ({
      id: category,
    }));
    return this.postsService.create({
      ...createPostDto,
      author: { connect: { id: sub } },
      categories: { connect: categories },
    });
  }

  @Get()
  findAll(@Query() query?: PostQueryDto) {
    return this.postsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const categories = updatePostDto.categories?.map((category) => ({
      id: category,
    }));
    return this.postsService.update(id, {
      ...updatePostDto,
      categories: { set: categories },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
