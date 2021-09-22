import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AllclientComponent } from './pages/allclient/allclient.component';

const routes: Routes = [
  {
    path :'login',
    component: LoginComponent,
    pathMatch :'full',    
},
{
  path :'allclient',
  component: AllclientComponent,
  pathMatch :'full',   
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
