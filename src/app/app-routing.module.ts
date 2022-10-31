import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then( m => m.RegisterPageModule),
    
  },
  {
    path: 'chat',
    loadChildren: () => import('./Pages/chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./Pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'index',
    loadChildren: () => import('./Pages/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'about-me',
    loadChildren: () => import('./Pages/about-me/about-me.module').then( m => m.AboutMePageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./Pages/error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./Pages/menu/menu.module').then( m => m.MenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
