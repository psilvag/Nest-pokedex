import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';



@Injectable()
export class SeedService {

    private URL:string='https://pokeapi.co/api/v2/pokemon?limit=650'
    constructor(
    // InjectModel permite inyectar modelos en el servicio
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,
    private readonly http:AxiosAdapter

  ){}    

  async executeSeed() {
   await this.pokemonModel.deleteMany({}) 
   const pokemontoInsert:{name:string,no:number}[]=[]
   const data= await this.http.get<PokeResponse>(this.URL)
    data.results.forEach(({name,url})=>{
    const segments= url.split('/')
    const no:number= +segments[segments.length-2]
    pokemontoInsert.push({name,no})
    
   })
   // Insertamos con una sola insersion 
   await  this.pokemonModel.insertMany(pokemontoInsert)
   return 'Seed Executed succesfully.------Database ready------.'
  }
  
}


/**Insertar un pokemon a la vez
 * METODO 2
 * @Injectable()
export class SeedService {
  private readonly axios: AxiosInstance=axios

  constructor(
    @InjectModel(Pokemon.name)// InjectModel permite inyectar modelos en el servicio
    private readonly pokemonModel:Model<Pokemon>
  ){}    

  async executeSeed() {
   const {data}= await  this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

   data.results.forEach(async({name,url})=>{
    const segments= url.split('/')
    const no:number= +segments[segments.length-2]
    const pokemon = await this.pokemonModel.create({name,no})
     
   })
   return 'Seed Executed succesfully'
   
    
  }
}
 */


/**Insertar multiples registros usando AWAIT PROMISE.ALL[] 
 * METODO 3
 * 
 * @Injectable()
export class SeedService {
  private readonly axios: AxiosInstance=axios

  constructor(
    @InjectModel(Pokemon.name)// InjectModel permite inyectar modelos en el servicio
    private readonly pokemonModel:Model<Pokemon>
  ){}    

  async executeSeed() {
   await this.pokemonModel.deleteMany({}) // Sirve para eliminar todos y volver a insertar// para probar

   const insertPromiseArray=[]

   const {data}= await  this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

   data.results.forEach(({name,url})=>{
    const segments= url.split('/')
    const no:number= +segments[segments.length-2]

    insertPromiseArray.push(
      this.pokemonModel.create({name,no})
      )
    
   })
   await Promise.all(insertPromiseArray)
   return 'Seed Executed succesfully'
   
    
  }
}
*/ 


