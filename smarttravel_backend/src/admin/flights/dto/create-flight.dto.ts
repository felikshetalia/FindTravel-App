import {
  IsDate,
  IsDecimal,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class CreateFlightDto {
  @IsString()
  airlineName!: string;

  @IsString()
  flightNumber!: string;

  @IsDate()
  departureTime!: Date;

  @IsDate()
  arrivalTime!: Date;

  @IsDecimal()
  price!: number;

  @IsString()
  currency!: string;

  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/)
  fromIataCode!: string;

  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/)
  toIataCode!: string;
}
