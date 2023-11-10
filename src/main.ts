import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  //añade la base api/v2 a la ruta http://localhost:3000/api/v2
  app.setGlobalPrefix('api/v2')
  await app.listen(process.env.PORT);
  console.log(`App running on port ${process.env.PORT}`)
}
bootstrap() ;
