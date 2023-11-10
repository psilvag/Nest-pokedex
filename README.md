<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# 🚀 Guia para la ejecución NEST-POKEDEX 

# Stack usado
* MongoDB
* NodeJS
* Express
* TypeScript
* Docker
* Nest


# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Instalar Nest CLI 
```
npm i -g @nestjs/cli 
```
4. Clonar el archivo __.env.template__ y renombrar la copia  a __.env__
5. Llenar las variables de entorno definidas en __.env__
6. Levantar la base de datos
```
docker-compose up -d
```
7. Ejecutar en modo desarrollo
```
yarn start:dev
```
8. Reconstruir la base de datos: Ejcutar 
```
GET 
http://localhost:3000/api/v2/seed
```

