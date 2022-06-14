import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { AuthData } from '../models/auth-data.model';
import { Habitacion } from '../models/habitacion.model';
import { Invitado } from '../models/invitados.model';
import { Picture } from '../models/picture.model';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  url="http://localhost:3000/api/reservas"

  private reservas:Reserva[]=[];
  private fetchReservas=new Subject<Reserva[]>();

  getReservas(){
    this.http.get<{message:string, reserva: []}>(this.url)
      .pipe(map(
        responseData=>{
          console.log(responseData)
          return responseData.reserva.map(
            (reservaResp:{
              _id:string;
              checkIn:Date;
              checkOut:Date;
              paquete:string;
              invitados:Invitado[];
              petitorio:AuthData;
              voucher?: Picture;
              habitacion:Habitacion;
              }) =>{
              return {
                id:reservaResp._id,
                checkIn:new Date(reservaResp.checkIn),
                checkOut:new Date(reservaResp.checkOut),
                paquete:reservaResp.paquete,
                invitados:reservaResp.invitados,
                petitorio: reservaResp.petitorio,
                voucher: reservaResp.voucher,
                habitacion:reservaResp.habitacion,
              };
            }
          )

        })

  )
  .subscribe(transformedData=>{
    console.log(transformedData)
    this.reservas=transformedData;
    this.fetchReservas.next([...this.reservas])
    console.log(this.reservas)
  })
  }

  constructor(private http:HttpClient) { }
}
