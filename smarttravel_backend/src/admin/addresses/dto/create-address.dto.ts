import { IsString, IsUUID } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street!: string;

  @IsString()
  houseNumber!: string;

  @IsString()
  postalCode!: string;

  @IsUUID()
  locationId!: string;
}
