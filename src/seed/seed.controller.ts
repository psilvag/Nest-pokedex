import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiResponse({status:200,description:'Seed executed successfully. Data created on DataBase'})
  @ApiResponse({status:400,description:'Bad request'})
  @Get()
  exceuteSeed() {
    return this.seedService.executeSeed();
  }


}
