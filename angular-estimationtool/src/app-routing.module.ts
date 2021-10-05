import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginGuard } from './shared/services/login.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './shared/layout/layout.component';
import { TopnavComponent } from './shared/layout/topnav/topnav.component';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { AllclientComponent } from './pages/allclient/allclient.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { EstimationsComponent } from './pages/estimations/estimations.component';


const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LayoutComponent,   
    canActivate: [LoginGuard],
    children:[      
      {
        path: '',
        component: DashboardComponent,       
        pathMatch: 'full'       
      },
      {
        path: 'estimations',
        component: EstimationsComponent,       
        pathMatch: 'full'       
      },
      {
        path: 'clients',
        component: AllclientComponent,       
        pathMatch: 'full'       
      },
      {
        path: 'projects',
        component: ProjectsComponent,       
        pathMatch: 'full'       
      }
    ]
  }  
];

@NgModule({
  declarations:[LayoutComponent,TopnavComponent,SidebarComponent],
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, AngularMaterialModule, FlexLayoutModule],
  exports: [RouterModule, AngularMaterialModule, FlexLayoutModule]
})
export class AppRoutingModule { }
