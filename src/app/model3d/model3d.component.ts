import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { ITerm } from '../label/label.component';

import * as models from './models.json'
import { Movement } from './movement';

@Component({
  selector: 'app-model3d',
  templateUrl: './model3d.component.html',
  styleUrls: ['./model3d.component.scss']
})
export class Model3dComponent implements OnInit {

  @Input() base64Img: string = ""
  @Input() command: any

  @Input() label: ITerm | undefined
  term: string = ""

  video: HTMLVideoElement | null = null
  container: HTMLElement | null = null
  static scene = new THREE.Scene()

  static camera: THREE.PerspectiveCamera | null = null
  static renderer: THREE.WebGLRenderer | null = null

  static mixer: any
  static clock: any

  mesh: THREE.Mesh | null = null

  static animatedModels: THREE.Group[] = []

  static partOfBody: any = []
  static body: any = []

  static movement: Movement 
  static spin: number = 1
  static numMovement: number = 0

  modelsJSON: any

  constructor() {
  }


  ngOnChanges(change: any) {
    console.log("ngOnchanges")
    for (let elem in change){
      if (elem == "command" && this.command) {
        this.setSpin()
        this.setNumMovement()
      }
      // if (elem == "label" && this.label) {
      //   this.loadOBJ()

      //   this.term = this.label["term"]
      // } else if (this.label) {
      //   this.loadOBJ("none")
      // }

    } 
  }

  ngOnInit(): void {
    this.init();
    this.loadOBJ()
    animate();

  }


  init() {

    this.modelsJSON = models

    Model3dComponent.clock = new THREE.Clock();


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
    Model3dComponent.renderer.outputEncoding = THREE.sRGBEncoding;

    document.querySelector("app-model3d")!.appendChild(Model3dComponent.renderer.domElement);




    //

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

      const constraints = { video: { width: 1280, height: 720, facingMode: 'environment'  } };

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

  setSpin() {
    if (this.command.label == 'Left') {
      Model3dComponent.spin = 1
    } else {
      Model3dComponent.spin = -1
    }
  }

  setNumMovement() {
    Model3dComponent.numMovement = this.command['num_detected']
    console.log("setNumMovement", Model3dComponent.numMovement, this.command['num_detected'] )
  }

  loadOBJ(isUfo?: string) {

    let path = ""
    debugger
    if (!isUfo) {
      path = "assets/models/human/"
    } else {
      path = this.modelsJSON[this.label!.term].toString()
    }

    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./three/examples/js/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    let that = this
    // Load a glTF resource
    loader.load(
      // resource URL
      path + 'scene.gltf',
      // called when the resource is loaded
      function (gltf) {

        // const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        // Model3dComponent.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(10, 10, 10);
        Model3dComponent.scene.add(dirLight);

        const mesh = gltf.scene;

        gltf.scene.animations = gltf.animations
        Model3dComponent.mixer = new THREE.AnimationMixer(gltf.scene)

        //Playing Animation
        Model3dComponent.mixer = new THREE.AnimationMixer(gltf.scene);
        console.log(gltf.animations);

        if (gltf.animations && gltf.animations.length) Model3dComponent.mixer.clipAction(gltf.animations[0]).play();

        // mesh.position.x = that.label!.position[0]/100
        // mesh.position.y = that.label!.position[1]/100


        Model3dComponent.scene.add(mesh);

        Model3dComponent.animatedModels.push(mesh)

        Model3dComponent.body = mesh
        
        
        Model3dComponent.partOfBody = Model3dComponent.animatedModels[0].children[0].children[0].children[0].children[0]

        Model3dComponent.movement = new Movement()


      },
      // called while loading is progressing
      function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

      },
      // called when loading has errors
      function (error) {

        console.log(error);

      }
    );
  }

}



function animate() {
  requestAnimationFrame(animate);

  Model3dComponent.renderer!.render(Model3dComponent.scene, Model3dComponent.camera!);
  if (Model3dComponent.animatedModels.length) {
    
    //Model3dComponent.animatedModels[0].rotation.y += 0.01

    if (Model3dComponent.numMovement == 1) Model3dComponent.movement.moveBraceUpperSx(0.01, Model3dComponent.spin)
    if (Model3dComponent.numMovement == 2) Model3dComponent.movement.moveBraceDownSx(0.01, Model3dComponent.spin)
    if (Model3dComponent.numMovement == 3) Model3dComponent.movement.moveHandSx(0.01, Model3dComponent.spin)
    if (Model3dComponent.numMovement == 4) Model3dComponent.movement.moveKneeSxUpper(0.01, Model3dComponent.spin)
      
  
    console.log("num", Model3dComponent.numMovement)

  }
  // Model3dComponent.animatedModels[0].rotation.z += 0.000001
  if (Model3dComponent.mixer) Model3dComponent.mixer.update(Model3dComponent.clock.getDelta());
  // Model3dComponent.animatedModels[0].position.x += 0.05*Math.sin(Model3dComponent.alpha)
  //   Model3dComponent.animatedModels[0].position.y += 0.05*Math.cos(Model3dComponent.alpha)
  //   Model3dComponent.animatedModels[0].position.z += 0.05*Math.sin(Model3dComponent.alpha)



}



