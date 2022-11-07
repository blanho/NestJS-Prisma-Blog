import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { isEmptyObj } from 'src/helpers/IsEmptyObj';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({ data: createCategoryDto });
  }

  findAll(query: Prisma.CategoryInclude) {
    if (isEmptyObj(query)) {
      query = null;
    }
    return this.prismaService.category.findMany({ include: query });
  }

  findOne(id: string) {
    return this.prismaService.category.findUnique({ where: { id } });
  }
  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      data: updateCategoryDto,
      where: { id },
    });
  }
  remove(id: string) {
    return this.prismaService.category.delete({ where: { id } });
  }
}
