import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PostService } from '../PostService';

@Component({
  selector: 'app-post-detail',
  template: `
    <div class="container mt-4" *ngIf="post">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{ post.title }}</li>
        </ol>
      </nav>

      <article class="card shadow-sm border-0 p-4">
        <header class="mb-4">
          <h1 class="display-5 text-primary fw-bold">{{ post.title }}</h1>
          <div class="text-muted small" *ngIf="post.createdAt">
            {{ post.createdAt | date: 'fullDate' }}
          </div>
        </header>

        <div class="card-text lead text-secondary" style="white-space: pre-wrap;">
          {{ post.content }}
        </div>

        <footer class="mt-5 border-top pt-3">
          <a href="/" class="btn btn-outline-primary">&larr; Back to home</a>
        </footer>
      </article>
    </div>

    <div class="container mt-4 text-center" *ngIf="!post && !error">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="container mt-4 text-center" *ngIf="error">
       <div class="alert alert-danger">
         Post not found or an error occurred.
       </div>
       <a href="/" class="btn btn-primary">Back to home</a>
    </div>
  `,
  styles: [`
    .lead { font-size: 1.15rem; line-height: 1.8; }
  `],
  standalone: false
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPost(id).subscribe({
        next: (post) => {
          if (post && post.id) {
            this.post = post;
          } else {
            this.error = true;
          }
        },
        error: () => {
          this.error = true;
        }
      });
    }
  }
}
