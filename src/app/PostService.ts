import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export type CreatePostDto = Omit<Post, 'id'> & { categoryId?: string };

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/v1/posts`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl)
      .pipe(
        timeout(10000),
        catchError(this.handleError<Post[]>('getAll', []))
      );
  }

  getTestPosts(): Observable<Post[]> {
    const mockPosts: Post[] = [
      { id: '1', title: 'Post de Test (Mode Forcé)', content: 'Le frontend est bien connecté, mais le backend ne renvoie rien.', author: 'Admin', createdAt: new Date().toISOString() }
    ];
    return of(mockPosts);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Post>(`getPost id=${id}`))
      );
  }

  create(post: CreatePostDto): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post)
      .pipe(
        catchError(this.handleError<Post>('create'))
      );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/v1/categories`)
      .pipe(
        timeout(10000),
        catchError(this.handleError<Category[]>('getCategories', []))
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
      console.error(`[DEBUG_LOG] ${operation} failed:`, error);
      if (error.status === 0) {
        console.warn("[DEBUG_LOG] Le backend est inaccessible (éteint ou problème de CORS)");
      }
      return of(result as T);
    };
  }
}
