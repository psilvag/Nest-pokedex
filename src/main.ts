import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const logger= new Logger('Pokedex App')
  //añade la base api/v2 a la ruta http://localhost:3000/api/v2
  app.setGlobalPrefix('api/v2')
  app.useGlobalPipes(
    new ValidationPipe({
        // remueve todo lo que no esta en los DTOS
        whitelist:true,  
        // Repsonde un badrequest si llegan propiedades no requeridas
        forbidNonWhitelisted:true,
        // Transforma auotaticamente el dato del DTO a lo que esperamos 
        transform:true,
        transformOptions:{
          enableImplicitConversion:true
        } 
        })
  )
  //CONFIGURACION SWAGGER
  const config = new DocumentBuilder()
    .setTitle('PokemonNest API')
    .setDescription('Pokedex EndPoints')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-poke', app, document);   

  await app.listen(process.env.PORT);
  logger.log(`App running on port ${process.env.PORT}`)
}
bootstrap() ;
