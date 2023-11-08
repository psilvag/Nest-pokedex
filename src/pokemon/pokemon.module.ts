import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, pokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Pokemon.name,  //Es el nombre de la entity
        schema:pokemonSchema        
      },
     /**Aqui iria mas entitys si las habria
      * {},
      * {},
      * {}
      */
    ])
      
  ],
  exports:[MongooseModule]
})
export class PokemonModule {}
