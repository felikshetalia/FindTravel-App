import {
  IsDateString,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateFlightDto {
  @IsString()
  airlineName!: string;

  @IsString()
  flightNumber!: string;

  @IsDateString()
  departureTime!: Date;

  @IsDateString()
  arrivalTime!: Date;

  @IsNumber()
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
