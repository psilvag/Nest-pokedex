import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Query } from '@nestjs/common/decorators/http';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pokemon } from './entities/pokemon.entity';


@ApiTags('Pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly pokemonService: PokemonService
  ) {}
  
  @ApiResponse({status:201,description:'Pokemon was created', type:Pokemon})
  @ApiResponse({status:400,description:'Bad request'})
  @Post()
  //@HttpCode(HttpStatus.OK) // HttpStatus.OK lo transforma a  status 200
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @ApiResponse({status:200,description:'Find all Pokemons'})
  @ApiResponse({status:400,description:'Bad request'})
  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    
    return this.pokemonService.findAll(paginationDto);
  }

  @ApiResponse({status:200,description:'Find one pokemon by param '})
  @ApiResponse({status:404,description:'Item not found'})
  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.pokemonService.findOne(param);
  }

  @ApiResponse({status:200,description:'Pokemon uptaded successfully'})
  @ApiResponse({status:400,description:'Bad request'})
  @ApiResponse({status:404,description:'Item not found'})
  @Patch(':param')
  update(@Param('param') param: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(param, updatePokemonDto);
  }

  @ApiResponse({status:204,description:'Pokemon deleted successfully'})
  
  @Delete(':id')
  // En @Param('id') quiero asegurarme que el ID sea un objectID, pero no tenemos un objectID pipe asi que lo crearemos
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
