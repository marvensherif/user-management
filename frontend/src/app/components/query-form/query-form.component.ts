import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-query-form',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css']
})
export class QueryFormComponent implements OnInit, AfterViewInit {
  searchQuery: any = {
    name: '',
    address: '',
    dateOfBirth: null
  };
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'dateOfBirth', 'address', 'actions'];


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }

  // Helper function to format date to MySQL compatible format
  convertToMySQLDateFormat(date: any): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  searchProfiles(): void {
    let params = new HttpParams();

    if (this.searchQuery.name) {
      params = params.set('name', this.searchQuery.name);
    }
    if (this.searchQuery.address) {
      params = params.set('address', this.searchQuery.address);
    }
    if (this.searchQuery.dateOfBirth) {
      const formattedDate = this.convertToMySQLDateFormat(this.searchQuery.dateOfBirth);
      params = params.set('dateOfBirth', formattedDate);
    }

    this.http.get<any[]>('http://localhost:5000/api/profile/search', { params })
    .subscribe({
      next: (data) => {
        this.dataSource.data = data;

      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.openSnackBar('Error fetching profiles.');
      }
    });
  }

  editProfile(row: any): void {
    row.isEditing = true;
  }

  saveProfile(row: any): void {
    if (!row.name || !row.address || !row.dateOfBirth) {
      this.openSnackBar('All fields are required for updating the profile.');
      return;
    }

    this.http.put(`http://localhost:5000/api/profile/${row.id}`, {
      id: row.id,
      name: row.name,
      address: row.address,
      dateOfBirth: row.dateOfBirth
    }).subscribe(() => {
      this.openSnackBar('Profile updated successfully!');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, error => {
      console.error('Error updating profile:', error);
      this.openSnackBar('Error updating profile.');
    });
  }

  deleteProfile(id: number): void {
    this.http.delete(`http://localhost:5000/api/profile/${id}`)
      .subscribe(() => {
        this.openSnackBar('Profile deleted successfully!');

        // Refresh the page after a successful delete
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, error => {
        console.error('Error deleting profile:', error);
        this.openSnackBar('Error deleting profile.');
      });
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
