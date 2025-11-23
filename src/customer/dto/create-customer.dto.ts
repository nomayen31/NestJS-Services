import { IsInt, IsString, IsEmail, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  @Max(120)
  age: number;


}
