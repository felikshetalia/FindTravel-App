import { IsString, IsUUID, Length, Matches } from 'class-validator';

export class CreateAirportDto {
  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/)
  iataCode!: string;

  @IsString()
  name!: string;

  @IsUUID()
  locationId!: string;
}
