import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AddPost } from './add-post/add-post';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-post', component: AddPost },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
