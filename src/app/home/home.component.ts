import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Post, PostService } from '../PostService';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('[DEBUG_LOG] HomeComponent: Initializing and fetching posts...');

    this.postService.getAll().subscribe({
      next: (posts) => {
        console.log('[DEBUG_LOG] HomeComponent: received NEXT:', posts);
        this.isLoading = false;
        if (posts && posts.length > 0) {
          this.posts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else {
          this.posts = [];
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[DEBUG_LOG] HomeComponent: received ERROR:', err);
        this.isLoading = false;
        this.posts = [];
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('[DEBUG_LOG] HomeComponent: received COMPLETE');
      }
    });
  }
}
