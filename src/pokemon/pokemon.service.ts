import { Injectable } from '@nestjs/common';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';


@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)// InjectModel permite inyectar modelos en el servicio
    private readonly pokemonModel:Model<Pokemon>
  ){}


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name=createPokemonDto.name.toLowerCase()
    try{
      const pokemon= await this.pokemonModel.create(createPokemonDto)
      return pokemon
    }catch(error){
      // Esto es lo que devuelve el error y lo usamos para validar
      // {
      //   index: 0,
      //   code: 11000,
      //   keyPattern: { name: 1 },
      //   keyValue: { name: 'pikachu' },
      //   [Symbol(errorLabels)]: Set(0) {}
      // }

      // Este metodo se crea al final del servicio, es para manejar errores
      this.handleExceptions(error)
    }
  }

  findAll(paginationDto:PaginationDto) {
    const {limit=10,offset=0}=paginationDto
    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      no:1  // el 1 le indica que lo ordene de menor a mayor
    })
    .select('-__v') // quitamos la propiedad __v
  }

  async findOne(param: string) {
    let pokemon:Pokemon

    // Validacion si el parametro es el numero del pokemon
    if(!isNaN(+param)){
      pokemon=await this.pokemonModel.findOne({no:param})
    }

    // Validacion si el parametro es un mongoID
    if(!pokemon && isValidObjectId(param)){
       pokemon= await this.pokemonModel.findById(param)
    }

   // Validacion si el parametro es el nombre del pokemon
    if(!pokemon){
      pokemon= await this.pokemonModel.findOne({name:param.toLocaleLowerCase().trim()})
    }

   // Si no existe el pokemon
    if(!pokemon){
      throw new NotFoundException(`Pokemon whit parameter ${param} not Found`)
    }

    return pokemon;
  }

  async update(param: string, updatePokemonDto: UpdatePokemonDto) {
     //findOne: metodo del servicio, no de mongo (no confundir)
     const pokemon= await this.findOne(param) 
     if(updatePokemonDto.name){
     // si la propiedad nombre viene de body lo volvemos a minisculas
       updatePokemonDto.name=updatePokemonDto.name.toLowerCase()
     }
     
     try{ 
       await pokemon.updateOne(updatePokemonDto)
     // devolvemos el pokemon actualizado
       return {...pokemon.toJSON(),...updatePokemonDto};
     }catch(error){
      this.handleExceptions(error)
    }
  }

  async remove(id:string) {
    
   // Si deleteCount es 0 no se elimino nada por tanto no encontro el id.
   const {deletedCount}= await this.pokemonModel.deleteOne({_id:id})
   if(deletedCount===0){
    throw new BadRequestException(`Pokemon whit id ${id} not found`)
   }
   return 'Register deleted succesfully'
    
  }



  private handleExceptions(error:any){
    if(error.code==11000){
      throw new BadRequestException(`Pokemon whit: ${JSON.stringify(error.keyValue)}, already exists in DB`)
     }
     console.log(error)
     throw new BadRequestException('Internal server error - check logs sever')
  }
}
