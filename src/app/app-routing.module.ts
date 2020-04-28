import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ViewComponent } from './pages/view/view.component';
import { SetupComponent } from './pages/setup/setup.component';
import { AuthGuard } from './services/authguard';
import { DisplayComponent } from './pages/display/display.component';
import { ClockComponent } from './pages/clock/clock.component';
import { ImageComponent } from './pages/image/image.component';
import { VideoComponent } from './pages/video/video.component';

const routes: Routes = [
  { path : "view", component: ViewComponent, canActivate: [AuthGuard], 
    children : [
      { path: 'display/:id', component: DisplayComponent, data: { animation: 'isRight'} },
      { path: 'clock/:id', component: ClockComponent, data: { animation: 'isRight' } },
      { path: 'image/:id', component: ImageComponent, data: { animation: 'isRight' } },
      { path: 'video/:id', component: VideoComponent, data: { animation: 'isRight' } },
    ]
  },
  { path : "setup", component : SetupComponent },

  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
