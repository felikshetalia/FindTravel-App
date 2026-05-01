import { IsDecimal, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAirportDto {
  @IsString()
  iataCode!: string;

  @IsString()
  name!: string;

  @IsUUID()
  locationId!: string;
}
