import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { SpeechSynthesisModule } from '@kamiazya/ngx-speech-synthesis';
import { AppComponent } from './app.component';
import { LabelComponent } from './label/label.component';
import { LoadingService } from './loading.service';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { LangPipe } from './pipes/lang.pipe';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { Model3dComponent } from './model3d/model3d.component';

@NgModule({
  declarations: [
    AppComponent,
    LabelComponent,
    LoadingModalComponent,
    ErrorModalComponent,
    LangPipe,
    ActionBarComponent,
    Model3dComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    SpeechSynthesisModule.forRoot({
      lang: 'en',
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
    })
  ],
  providers: [
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
