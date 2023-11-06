import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist:true,  // remueve todo lo que no esta en los DTOS
        forbidNonWhitelisted:true // Repsonde un badrequest si llegan propiedades no requeridas
        })
  )
  //añade la base api/v2 a la ruta http://localhost:3000/api/v2
  app.setGlobalPrefix('api/v2')
  await app.listen(3000);
}
bootstrap() ;
