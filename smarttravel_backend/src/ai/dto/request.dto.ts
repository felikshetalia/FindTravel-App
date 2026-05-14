import { IsNumber, IsString, Min, IsArray, IsOptional } from 'class-validator';

export class RequestDto {
  @IsOptional()
  @IsString()
  origin?: string;

  @IsOptional()
  @IsString()
  destination?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  budget?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsString()
  season?: string;

  @IsOptional()
  @IsString()
  promptLanguage?: string;
}

export class UserRequestDto {
  @IsString()
  prompt!: string;

  @IsOptional()
  @IsString()
  promptLanguage?: string;
}

export type PreferencesJson = {
  origin?: string | null;
  destination?: string | null;
  duration?: number | null;
  budget?: number | null;
  currency?: string | null;
  interests?: string[];
  season?: string | null;
  promptLanguage?: string;
};
