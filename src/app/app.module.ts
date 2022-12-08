import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpeechSynthesisModule } from '@kamiazya/ngx-speech-synthesis';
import { AppComponent } from './app.component';
import { LabelComponent } from './label/label.component';
import { LoadingService } from './loading.service';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { LangPipe } from './pipes/lang.pipe';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { Model3dComponent } from './model3d/model3d.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


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
    SpeechSynthesisModule.forRoot({
      lang: 'en',
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
    }),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
