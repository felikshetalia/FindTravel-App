import { IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  country!: string;

  @IsString()
  city!: string;

  @IsOptional()
  @IsString()
  state?: string;
}
