import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Post[]>('getAll', []))
      );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Post>(`getPost id=${id}`))
      );
  }

  create(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post)
      .pipe(
        catchError(this.handleError<Post>('create'))
      );
  }

  update(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post)
      .pipe(
        catchError(this.handleError<Post>('update', post))
      );
  }

  delete(post: Post): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${post.id}`)
      .pipe(
        catchError(this.handleError<boolean>('delete'))
      );
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error); // log to console
      return of(result as T);
    };
  }
}
