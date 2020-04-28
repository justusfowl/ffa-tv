import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// import { MomentModule } from 'angular2-moment';
// import { MomentTimezoneModule } from 'angular-moment-timezone';

import { MaterialModule } from './material.module';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ViewComponent } from './pages/view/view.component';
import { SetupComponent } from './pages/setup/setup.component';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';

import { DeviceService } from './services/device.service';
import { PlayService } from './services/play.service';
import { DisplayComponent } from './pages/display/display.component';
import { ClockComponent } from './pages/clock/clock.component';
import { AnalogclockComponent } from './components/analogclock/analogclock.component';
import { ImageComponent } from './pages/image/image.component';
import { VideoComponent } from './pages/video/video.component';

const config: SocketIoConfig = { url: environment.apiProtocol + '://' + environment.apiBase + ':' + environment.apiPort, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    ViewComponent,
    SetupComponent,
    DisplayComponent,
    ClockComponent,
    AnalogclockComponent,
    ImageComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule, 
    SocketIoModule.forRoot(config),
    // MomentModule,
    // MomentTimezoneModule
  ],
  providers: [
    DataService, 
    AuthService, 
    DeviceService,
    PlayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
