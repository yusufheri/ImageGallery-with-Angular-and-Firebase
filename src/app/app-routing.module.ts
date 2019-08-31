import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageComponent } from './images/image/image.component';
import { ImagesComponent } from './images/images.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// : if request.auth != null
const routes: Routes = [
  { path: '', redirectTo: 'image/list', pathMatch: 'full'},
  { path: 'image', component: ImagesComponent, children: [
    { path: 'upload', component: ImageComponent }, // image/upload
    { path: 'list', component: ImageListComponent } // image/list
  ]},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
