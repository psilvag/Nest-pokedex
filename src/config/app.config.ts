
// Creamos una funcion que mapeara las variables del entorno
export const EnvConfiguration=()=>({
    environment:process.env.NODE_ENV || 'dev',
    mongodb:process.env.MONGODB,
    port:process.env.PORT || 3001,
    defaultLimit:+process.env.DEFAULT_LIMIT || 7
    // el + delante de proccess.env.DEFAULT_LIMIT asegura que ese valor sea un numero ya que estamos trabajando con el paquete JOI, y esa variable de entorno (DEFAULT_LIMIT) es asignado a la propiedad limit, que es parte del paginationDTO, donde se valida que limit tiene quye ser de tipo number

})

//La sintaxis de arriba esta devolviendo un objeto, equivale a
/**const env=()=>{
    return {}
} */ 