import { Component, OnInit } from '@angular/core';
import { ServicioService } from './servicio.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MenuController, Platform, ToastController, AlertController, NavParams } from '@ionic/angular';

import { Observable } from 'rxjs';
import { AlarmVacunaService, valorReloj } from './alarm-vacuna.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  datos$: Observable<valorReloj>;
  hora: number;
  minutos: string;
  dia: string;
  fecha: string;
  ampm: string;
  segundos: string;

  length;
  i=0;
  parseHR;
  ps;
  horaReal;
  horaBD;
  fechahora;
  parseHB;

  dia1;
  mes1;
  anho1;
  fechaCalcu;

  p;
  hr;
  mr;
  sr;
  horacalcu;
  cc;

  
 
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private router: Router,
    public servicio: ServicioService,
    public menu: MenuController,
    private ruta: ActivatedRoute,
    public toastCrl: ToastController,
    public alertController: AlertController,
    private servi: AlarmVacunaService
    ) {
      this.initializeApp();
    }

    usuarios;
    email;
    password;

    initializeApp(){
      this.platform.ready().then(() =>{
        if(localStorage.getItem('id')){
          this.router.navigate(['/home'])
        }else{
          this.router.navigate(['/login'])
        }

        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }

    openFirst(){
      this.menu.enable(true, 'first');
      this.menu.open('first');
    }

    irInicio(){
      this.router.navigate(['/home']);
    }

    irUsuario(item){
      this.router.navigate(['registro', localStorage.getItem('id')]);
    }
    
    irVacuna(){
      this.router.navigate(['/listado-vacunas']);
    }

    irEnfermedad(){
      this.router.navigate(['/listado-enfermedades']);
    }

    irGeolocation(){
      this.router.navigate(['/geolocation']);
    }

    cerrarSesion(){
      localStorage.removeItem('id');
      this.router.navigate(['/login']);
    }

    reproducir(){
      const audio = new Audio('assets/icon/alarma2.mp3');
      audio.play();
    }
  
    parar(){
      const audio = new Audio('assets/icon/alarma2.mp3');
      audio.pause();
    }

  fecBD;
  raux;
  aux2:number;
  horr;
  parseHora;
  qq;

    ngOnInit(){

      if(localStorage.getItem('id') != null){

        this.ruta.params.subscribe((params: Params) => {
          this.servicio.getVacunaByUsuario(localStorage.getItem('id')).subscribe( res => {
            this.length = ['vacunalista'].length;

            //fecha actual
            this.dia1 = new Date().getDate();
            this.mes1 = new Date().getMonth() + 1;
            this.anho1 = new Date().getFullYear();

            if(this.dia1<10){
              this.dia1 = '0'+this.dia1;
            }
            if(this.mes1<10){
              this.mes1 = '0'+this.mes1;
            }

            this.fechaCalcu= this.anho1 +'-'+ this.mes1 +'-'+ this.dia1;

            this.datos$= this.servi.getInfoReloj();

            this.datos$.subscribe( x => {
              this.hora = x.hora;
              this.minutos = x.minutos;
              this.dia = x.diadesemana;
              this.fecha = x.diaymes;
              this.ampm = x.ampm;
              this.segundos = x.segundo

              //hora actual
              this.hr = new Date().getHours();
              this.mr = new Date().getMinutes();
              this.sr = new Date().getSeconds();

              if(this.hr<10){
                this.hr = '0'+ new Date().getHours();
              }
              if(this.mr<10){
                this.mr = '0'+ new Date().getMinutes();
              }
              if(this.sr<10){
                this.sr = '0'+ new Date().getSeconds();
              }

              if(this.i === this.length){
                this.i = 0;
              }

              this.horacalcu= this.hr +':'+ this.mr +':'+ this.sr;
              this.p= this.fechaCalcu +' '+ this.horacalcu;

              this.horaBD= res['vacunalista'][this.i].hora;
              //console.log(this.fecBD);
              this.fechahora= this.fechaCalcu +' '+ this.horaBD;

              this.parseHB= Date.parse(this.fechahora);
              //console.log(this.parseHB);

              this.parseHR= Date.parse(this.p);
              //console.log(this.parseHR);

              this.fecBD= res['vacunalista'][this.i].siguiente_aplicacion;
              this.raux= res['vacunalista'][this.i].rep;

              this.raux= res['vacunalista'][this.i].rep;
              this.aux2= this.raux + this.hr;

              if(this.aux2>24){
                this.aux2 = 0;
              }

              if(this.fechaCalcu < this.fecBD){
                if(this.parseHB === this.parseHR){
                  this.alarma();
                  this.reproducir();
                  console.log('paso if');
                }else{
                  this.horr = this.aux2 +':'+ this.mr +':'+ this.sr;
                  this.qq = this.fechaCalcu +' '+ this.horr;
                  this.parseHora = Date.parse(this.qq);

                  if(this.parseHora === this.parseHR){
                    this.alarma();
                    this.reproducir();
                    this.aux2 = this.raux + this.hr;
                    console.log('entro else')
                  }
                }
              }
              this.i = this.i + 1;

            });
            
          });

        });
      }else{

      }
    }

  async alarma(){
    const alert = await this.alertController.create({
      header: 'Recordatorio',
      message: '¡Debe aplicarse su siguiente dosis!',
      buttons:[
        {
          text:'Ir a VacunApp',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //this.parar();
            this.router.navigate(['home']);
            console.log('Redireccionado');
          }
        },{
          text: 'Suspender',
          handler: () => {
            //this.parar();
            this.router.navigate(['/listado-vacunas']);
            console.log('Suspendido');
          }
        }
      ]
    });
    await alert.present();
  }

  
}
