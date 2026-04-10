import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService, Category } from '../PostService';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

@Component({
  selector: 'app-add-post',
  standalone: false,
  templateUrl: './add-post.html',
  styleUrl: './add-post.css',
})
export class AddPost implements OnInit {
  postForm!: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      categoryId: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(2500)]]
    });

    this.postService.getCategories().subscribe(cats => {
      this.categories = cats || [];
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.postService.create(this.postForm.value).subscribe(() => {
        Toast.fire({
          icon: 'success',
          title: 'Post created successfully'
        }).then(() => {
          this.router.navigate(['/']);
        });
      });
    } else {
      Object.keys(this.postForm.controls).forEach(key => {
        const control = this.postForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      Toast.fire({
        icon: 'error',
        title: 'Please fix the errors in the form before submitting'
      });
    }
  }
}
