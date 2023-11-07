import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';



@Module({
  imports: [
    // Creamos el directorio a la ruta publica
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','public'),
    }),
    //Conexion a la base de datos
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    //Importamos los modulos
    PokemonModule,
    CommonModule,
    SeedModule

  ]
 
})
export class AppModule {}
 