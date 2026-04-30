import { IsDecimal, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAccommodationDto {
  @IsString()
  name!: string;

  @IsNumber()
  nights!: number;

  @IsDecimal()
  costPerNight!: number;

  @IsString()
  currency!: string;

  @IsUUID()
  addressId!: string;
}
