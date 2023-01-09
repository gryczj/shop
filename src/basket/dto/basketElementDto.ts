import { IsNotEmpty, IsNumber } from 'class-validator';

export class basketElementDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
