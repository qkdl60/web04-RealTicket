import { Controller, Get } from '@nestjs/common';

import { PlaceService } from './place.service';

@Controller('mock/place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('seat/:placeId')
  async getSeatsByPlaceId() {
    return await this.placeService.getSeatsByPlaceId();
  }
}
