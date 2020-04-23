import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ViewComponent } from './pages/view/view.component';
import { SetupComponent } from './pages/setup/setup.component';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


import { environment } from '../environments/environment';
import { DeviceService } from './services/device.service';

const config: SocketIoConfig = { url: environment.apiProtocol + '://' + environment.apiBase + ':' + environment.apiPort, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    ViewComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, 
    SocketIoModule.forRoot(config),
  ],
  providers: [
    DataService, 
    AuthService, 
    DeviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
