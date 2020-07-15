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
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RssfeedComponent } from './pages/rssfeed/rssfeed.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { BulletslideComponent } from './pages/bulletslide/bulletslide.component';

const routes: Routes = [

  { path : "view", component: ViewComponent, canActivate: [AuthGuard], children : [ ] },
  { path: 'welcome', component: WelcomeComponent, data: { animation: 'welcome'} },
  { path: 'display/:id', component: DisplayComponent, data: { animation: 'display'} },
  { path: 'clock/:id', component: ClockComponent, data: { animation: 'clock' } },
  { path: 'image/:id', component: ImageComponent, data: { animation: 'image' } },
  { path: 'video/:id', component: VideoComponent, data: { animation: 'video' } },
  { path: 'feed/:id', component: RssfeedComponent, data: { animation: 'rss' } },
  { path: 'quote/:id', component: QuoteComponent, data: { animation: 'quote' } },
  { path: 'weather/:id', component: WeatherComponent, data: { animation: 'quote' } },
  
  { path: 'bulletslide/:id', component: BulletslideComponent, data: { animation: 'bulletslide' } },

  { path : "setup", component : SetupComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
