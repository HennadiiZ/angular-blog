import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostPageComponent } from './post-page/post-page.component'


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children : [
        {path: '', redirectTo: '/', pathMatch: 'full'},
        {path: '', component: HomePageComponent},
        {path: 'post/:id', component: PostPageComponent }
    ]
  },
  {
    // path: 'admin', loadChildren: './admin/admin.module#AdminModule'
    // https://stackoverflow.com/questions/70313032/type-string-is-not-assignable-to-type-loadchildrencallback
    // new syntax
    path: 'admin', loadChildren: ()=> import('./admin/admin.module').then(x => x.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
     preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
