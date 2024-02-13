
import { Prop, Schema } from "@nestjs/mongoose/dist/decorators"
import { SchemaFactory } from "@nestjs/mongoose/dist/factories"
import { ApiProperty } from "@nestjs/swagger"
import { Document } from "mongoose"


/** Las entitys son una referencia exacta a como queremos grabar los datos en la base de datos
 * Cada instancia de la clase(entity) seria un nuevo registro 
 * Esta clase extiende de Document para que sea considerado como un documento, esto si se trabaja para Mongo
 * */ 
@Schema()
export class Pokemon extends Document{
   //id lo genera mongo automaticamente
   @ApiProperty({
    description:'Pokemon name',
    uniqueItems:true,
    example:'Pikachu'
}) 
  @Prop({
    unique:true,
    index:true  // son indices 
  }) 
  name:string


  @ApiProperty({
    description:'Pokemon number',
    uniqueItems:true,
    example:3
}) 
  @Prop({
    unique:true,
    index:true
  }) 
  no:number

}

export const pokemonSchema= SchemaFactory.createForClass(Pokemon)
