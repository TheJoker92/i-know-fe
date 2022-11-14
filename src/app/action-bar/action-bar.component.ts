import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { bool } from '@techstark/opencv-js';
import { ITerm } from '../label/label.component';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  @Input() isPaused: boolean = false
  @Input() label: ITerm = {
    _id: '',
    position: [],
    term: '',
    dictionary: undefined
  }

  @Output() takeSnaphotE: EventEmitter<bool> = new EventEmitter<bool>()
  @Output() enableCameraE: EventEmitter<bool> = new EventEmitter<bool>()

  constructor() { }

  ngOnInit(): void {
  }

  takeSnapshot() {
    this.takeSnaphotE.emit(true)
  }

  enableCamera() {
    this.enableCameraE.emit(true)
  }

}
