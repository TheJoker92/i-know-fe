import { Component, Input, OnInit } from '@angular/core';
import { SpeechSynthesisUtteranceFactoryService, SpeechSynthesisService } from '@kamiazya/ngx-speech-synthesis';



@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  @Input() label: ITerm | undefined


  labelStr: string  = ""
  lang = "it"
 
  constructor(public f: SpeechSynthesisUtteranceFactoryService, public svc: SpeechSynthesisService) {
    f.lang = "it"
  }

  ngOnInit(): void {
    if (this.label) this.labelStr = this.label["dictionary"][this.lang]["word"]
  }

  ngAfterViewInit(): void {

    // let position = this.label!.position
    // let centerX = position[0]
    // let centerY = position[1]


    // document.getElementById(this.label!._id.toString())!.style.top = centerY.toString() + "px"
    // document.getElementById(this.label!._id.toString())!.style.left = centerX.toString() + "px"
  }

  onSearch() {
    this.speech(this.labelStr)
  }


  speech(term: string) {
   
      this.svc.speak(this.f.text(this.label!["dictionary"][this.lang]["word"]));
      this.svc.speak(this.f.text(this.label!["dictionary"][this.lang]["definition"]));

    
  }

  cancel() {
    this.svc.cancel();
  }
  pause() {
    this.svc.pause();
  }

  resume() {
    this.svc.resume();
  }
}


export interface ILabel {
  label: string
  position: number[]
}

export interface ITerm {
  "_id": string
  "position": number[]
  "term": string
  "dictionary": any
}