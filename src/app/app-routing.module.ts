import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ViewComponent } from './pages/view/view.component';
import { SetupComponent } from './pages/setup/setup.component';
import { AuthGuard } from './services/authguard';

const routes: Routes = [
  { path : "view", component : ViewComponent, canActivate: [AuthGuard] },
  { path : "setup", component : SetupComponent },

  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
