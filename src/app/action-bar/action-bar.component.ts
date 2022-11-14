import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() takeSnaphotE: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() enableCameraE: EventEmitter<boolean> = new EventEmitter<boolean>()

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
