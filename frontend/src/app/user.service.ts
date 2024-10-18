import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface User {
  name: string;
  dateOfBirth: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers(); // Load initial users
  }

  // Load users from the backend
  loadUsers(): void {
    this.http.get<User[]>('http://localhost:5000/api/users')
      .subscribe(users => {
        this.usersSubject.next(users);
      });
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:5000/api/users', user).pipe(
      tap((newUser) => {
        // Update the BehaviorSubject with the new user list
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next([...currentUsers, newUser]);
      })
    );
  }
}
