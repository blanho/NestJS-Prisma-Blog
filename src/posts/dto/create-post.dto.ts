import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;

  categories: string[];
}
