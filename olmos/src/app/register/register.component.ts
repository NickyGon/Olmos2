import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ComparePassword } from '../validators/customvalidator.validator';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { HabitDeleteComponent } from '../menu-prin/dialogs/habit-delete/habit-delete.component';
import { ErrorComponent } from '../menu-prin/dialogs/error/error.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hide2 = true;
  hide3=true;

  userForm !: FormGroup;


  access:string="";
  constructor(private authService:AuthService, private router:Router, private formBuilder:FormBuilder, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.userForm=this.formBuilder.group({
      nombre:['',Validators.required],
      apellidos: ['',Validators.required],
      ci:['',[Validators.required, Validators.minLength(8)]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      keyrole:['']
    },
    )
  }

  get keyrole() {
    return this.userForm.controls['keyrole'];
}

  get f(){
    return this.userForm.controls;
  }


  async onRegister() {
    
    if(this.userForm.invalid){
      return;
    }

    if(this.userForm.value['keyrole']=="admin123"){
      this.access="admin"
    } else if (this.userForm.value['keyrole']=="empleado123"){
      this.access="empleado"
    } else {
      this.access="cliente"
    }

    let response= await this.authService.register(this.userForm.value['nombre'],this.userForm.value['apellidos'],this.userForm.value['ci'],this.userForm.value['email'],this.userForm.value['password'],this.access)
    
    if(!response){
      this.openErrorDialog()
    }
  }

  openErrorDialog(){
    let dialogRef=this.dialog.open(ErrorComponent,{
      height:'max-content',
      panelClass: 'confirm-dialog-container',
      data:{
        message:"pi"
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    })
  }


}
