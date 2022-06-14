import { Picture } from "./picture.model"

export interface Habitacion{
    nombre:string,
    precio:number,
    categoria:string,
    piso:number,
    bloque:string
    capacidad:number
   // imagenes: Picture[]
}