import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent {
  
  listTarjetas: any[] = [
    {titular: 'Juan Perez', numeroTarjeta: '712831230293824', expiracion: '11/26', cvv: '123'},
    {titular: 'Jom Mills', numeroTarjeta: '432131415', expiracion: '04/29', cvv: '456'},
    {titular: 'Adont Towers', numeroTarjeta: '0189736467231', expiracion: '11/26', cvv: '789'},
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService
    ){
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      expiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv   : ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    })
   }

   ngOnInit(): void{
    this.obtenerTarjetas()
   }
  obtenerTarjetas() {
    this._tarjetaService.getListTarjetas().subscribe(data =>{
      console.log(data);
    }, error =>{
      console.log(error)
    })
  }
   

agregarTarjeta(){
  console.log(this.form);

  const tarjeta: any = {
    titular: this.form.get('titular')?.value,
    numeroTarjeta: this.form.get('numeroTarjeta')?.value,
    expiracion: this.form.get('expiracion')?.value,
    cvv: this.form.get('cvv')?.value
  }

  this.listTarjetas.push(tarjeta);
  this.toastr.success('La tarjeta a sido agregada exitosamente', 'Tarjeta Agregada')
  this.form.reset();
}

eliminarTarjeta(index: number){
  this.listTarjetas.splice(index, 1);
  this.toastr.error('La tarjeta a sido eliminada con exito', 'Tarjeta eliminada')
}


}
