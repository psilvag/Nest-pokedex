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
4. Levantar la base de datos
```
docker-compose up -d
```
5. Ejecutar en modo desarrollo
```
yarn start:dev
```
6. Reconstruir la base de datos: Ejcutar 
```
GET 
http://localhost:3000/api/v2/seed
```
