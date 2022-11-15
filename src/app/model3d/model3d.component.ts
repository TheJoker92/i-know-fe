import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'

import { ITerm } from '../label/label.component';


@Component({
  selector: 'app-model3d',
  templateUrl: './model3d.component.html',
  styleUrls: ['./model3d.component.scss']
})
export class Model3dComponent implements OnInit {

  @Input() base64Img: string = ""

  @Input() label: ITerm | undefined
  term: string = ""

  video: HTMLVideoElement | null = null
  container: HTMLElement | null = null
  static scene = new THREE.Scene()

  static camera: THREE.PerspectiveCamera | null = null
  static renderer: THREE.WebGLRenderer | null = null

  mesh: THREE.Mesh | null = null

  static animatedModels: THREE.Group[] = []

  static alpha = 0
  
  constructor() {
  }


  ngOnChanges(change: any) {
    for (let elem in change)
      if (elem == "label"  && this.label) {
        this.loadOBJ("assets/models/ufo/Low_poly_UFO")

        this.term = this.label["term"]
    }

  }

  ngOnInit(): void {
    this.init();
    animate();
  }


  init() {

    Model3dComponent.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    Model3dComponent.camera.position.z = 0.01;

    Model3dComponent.scene = new THREE.Scene();

    this.video = document.querySelector<HTMLVideoElement>('video');

    const texture = new THREE.VideoTexture(this.video!);
    Model3dComponent.scene!.background = texture

    

    Model3dComponent.camera.position.z = 20
    Model3dComponent.renderer = new THREE.WebGLRenderer({ antialias: true });
    Model3dComponent.renderer.setPixelRatio(window.devicePixelRatio);
    Model3dComponent.renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector("app-model3d")!.appendChild(Model3dComponent.renderer.domElement);

    if (window.DeviceOrientationEvent) {



      
  }
  


    //

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

      const constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {

        // apply the stream to the video element used in the texture

        this.video!.srcObject = stream;
        this.video!.play();

      }).catch(function (error) {

        console.error('Unable to access the camera/webcam.', error);

      });

    } else {

      console.error('MediaDevices interface not available.');

    }
  }

  

  loadOBJ(path:string) {
    const mtlLoader = new MTLLoader()
    mtlLoader.load(
        path+'.mtl',
        (materials) => {
            materials.preload()
    
            const objLoader = new OBJLoader()
            objLoader.setMaterials(materials)
            objLoader.load(
                path+'.obj',
                (object) => {

                  object.scale.x = 0.15
                  object.scale.y = 0.15
                  object.scale.z = 0.15

                  Model3dComponent.animatedModels.push(object)

                    Model3dComponent.scene.add( object );
                  
                     // Model3dComponent.scene.getObjectByName("mesh1")?.add( object );
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log('An error happened')
                }
            )
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log('An error happened')
        }
    )

 
      }
}



function animate() {
  requestAnimationFrame( animate );

  Model3dComponent.renderer!.render(Model3dComponent.scene, Model3dComponent.camera!);
  Model3dComponent.animatedModels[0].rotation.y += 1
  Model3dComponent.animatedModels[0].position.x = Math.sin(Model3dComponent.alpha)
  Model3dComponent.animatedModels[0].position.y =  Math.sin(Model3dComponent.alpha)
  Model3dComponent.animatedModels[0].position.z =  Math.sin(Model3dComponent.alpha)

  Model3dComponent.alpha += 1

}

