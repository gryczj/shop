import { IsNotEmpty, IsPositive, IsString, IsUrl } from 'class-validator';

export class AddProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsUrl()
  @IsNotEmpty()
  imageURL: string;
}
