import { Controller, Get, Inject } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('ping')
export class HealthController {
  constructor(private readonly _pingService: HealthService) {}
  @Get()
  ping() {
    return this._pingService.ping();
  }
}
