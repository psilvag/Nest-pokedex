
// Creamos una funcion que mapeara las variables del entorno
export const EnvConfiguration=()=>({
    environment:process.env.NODE_ENV || 'dev',
    mongodb:process.env.MONGODB,
    port:process.env.PORT || 3001,
    defaultLimit:process.env.DEFAULT_ENV || 7

})

//La sintaxis de arriba esta devolviendo un objeto, equivale a
/**const env=()=>{
    return {}
} */ 