import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { isEmptyObj } from 'src/helpers/IsEmptyObj';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createPostDto: Prisma.PostCreateInput) {
    return this.prismaService.post.create({ data: createPostDto });
  }
  findAll(query: Prisma.PostInclude) {
    if (isEmptyObj(query)) {
      query = null;
    }
    return this.prismaService.post.findMany({ include: query });
  }

  findOne(id: string) {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  update(id: string, updatePostDto: Prisma.PostUpdateInput) {
    return this.prismaService.post.update({
      data: updatePostDto,
      where: { id },
    });
  }
  remove(id: string) {
    return this.prismaService.post.delete({
      where: { id },
    });
  }
}
