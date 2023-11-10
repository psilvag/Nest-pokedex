import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { joiValidationSchema } from './config/joi.schema-validation';



@Module({
  imports: [
    // Configuramos las variables de entorno, es mejor ponerlo siempre al inicio
    ConfigModule.forRoot({
      // Ambos pueden trabajar en  conjunto
      load:[EnvConfiguration],
      validationSchema:joiValidationSchema
    }),
    // Creamos el directorio a la ruta publica
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','public'),
    }),
    //Conexion a la base de datos
    MongooseModule.forRoot(process.env.MONGODB),
    //Importamos los modulos
    PokemonModule,
    CommonModule,
    SeedModule
    

  ]
 
})
export class AppModule {}
 