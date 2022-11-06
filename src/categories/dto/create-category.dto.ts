import { MinLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  name: string;
}
