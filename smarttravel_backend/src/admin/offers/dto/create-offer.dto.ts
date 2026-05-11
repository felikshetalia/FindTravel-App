import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOfferDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  fee!: number;

  @IsString()
  currency!: string;

  @IsUUID()
  locationId!: string;

  @IsUUID()
  accommodationId!: string;

  @IsUUID()
  outboundFlightId!: string;

  @IsUUID()
  returnFlightId!: string;
}
