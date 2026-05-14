import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { RequestDto, UserRequestDto } from './dto/request.dto';

@Controller('ai/recommendations')
export class AiController {
  constructor(private readonly _aiService: AiService) {}

  @Post()
  recommend(@Body() dto: UserRequestDto) {
    return this._aiService.recommend(dto);
  }
}
