import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LoadingService } from './loading.service';

// const BASE_URL = "https://i-know-be.herokuapp.com/" 
const BASE_URL = "http://localhost:3000/"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  command: any
  commands: any
  base64Img: string = "";

  isPaused = false;
  isCameraExist = true;

  isCaptured = false


  imgElement: any
  inputElement: any


  labels: any = {
    "no-obj":""
  }

  terms: string[] = ["no-obj"]

  constructor(public loadingService: LoadingService,
              private socket: Socket) {
                

                socket.on('sendCommand',  (data:any) => {
                  console.log("socket emit")
                  if (data) {
                    this.command = JSON.parse(JSON.stringify(data))
                    console.log("SOCKET", this.command);
                  }
                });
    
  }
 
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    console.log("aaa")
    fetch(BASE_URL + 'sendCommand', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    }).then((response) => {
      console.log("res",response.body)
    })
    //.then((data) => {  console.log(JSON.stringify(data)) })
  }
  
  onOffWebCame() {
    this.isPaused = !this.isPaused;
  }



  takeSnapshot() {

    let canvas = document.createElement('canvas');
    let video: any = document.getElementById('video');

    canvas.width = 1920;
    canvas.height = 1080;

    let ctx = canvas.getContext('2d');
    ctx!.drawImage( video!, 0, 0, canvas.width, canvas.height );

    let base64Img = canvas.toDataURL('image/jpeg');

    this.base64Img = base64Img
    
    let sizeImageBase64: number[] = [640,480]; 

    this.compressImage(base64Img, sizeImageBase64[0]/2,sizeImageBase64[1]/2).then(
      (compressedImage: any) => {
        let data = {
          "frame_rgb": compressedImage.split(",")[1]
        }
    
        document.getElementsByTagName("video")[0].pause()
        this.isPaused = true;
    
        this.loadingService.isLoading = true
      //   fetch('http://localhost:9002/getDefinition', {
      //     method: 'POST', // or 'PUT'
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(data),
      //   })
      //   .then((response) => response.json())
      //   .then((data) => {  
    
      //     this.labels = JSON.parse(JSON.stringify(data["response"]))
      //     this.terms = Object.keys(this.labels)
    
      //     this.loadingService.isLoading = false
      //   })
      //   .catch(() => {
      //     this.loadingService.isLoading = false
      //     this.loadingService.isError = true
      //   })
      }
    )
    
  }

  
  enableCamera() {
    this.isPaused = false
    document.getElementsByTagName("video")[0].play()
  }

  compressImage(src: string, newX: number, newY: number) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d')!;
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    })
  }
  
}