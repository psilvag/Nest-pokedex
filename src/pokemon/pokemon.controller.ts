import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Query } from '@nestjs/common/decorators/http';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly pokemonService: PokemonService
  ) {}

  @Post()
  //@HttpCode(HttpStatus.OK) // HttpStatus.OK lo transforma a  status 200
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    
    return this.pokemonService.findAll(paginationDto);
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.pokemonService.findOne(param);
  }

  @Patch(':param')
  update(@Param('param') param: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(param, updatePokemonDto);
  }

  @Delete(':id')
  // En @Param('id') quiero asegurarme que el ID sea un objectID, pero no tenemos un objectID pipe asi que lo crearemos
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
