import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOfferDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  fee!: number;

  @IsString()
  currency!: string;

  @IsUUID()
  location_id!: string;

  @IsUUID()
  accommodation_id!: string;

  @IsUUID()
  outbound_flight_id!: string;

  @IsUUID()
  return_flight_id!: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  tour_ids?: string[];
}
