
 import * as Joi from 'joi'

 export const joiValidationSchema=Joi.object({
    MONGODB:Joi.required(),
    PORT:Joi.number().default(3001),
    DEFAULT_LIMIT:Joi.number().default(5)
 })

 /**
  * Lo que hace joivalidationschema es verificar si no viene algun valor en mis variables de entorno, entonces por default crea la VARIABLE DE ENTORNO CON EL VALOR ASIGNADO y toma ese la variable de entorno toma ese valor  
  */