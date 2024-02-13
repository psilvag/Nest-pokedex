

import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator'
export class CreatePokemonDto {

 @ApiProperty({
        
        example:3
 })    
 @IsInt()
 @IsPositive()
 @Min(1) 
 no:number

 @ApiProperty({
        
    example:'Pikachu'
})   
 @IsString()
 @MinLength(1)
 name:string  

}
