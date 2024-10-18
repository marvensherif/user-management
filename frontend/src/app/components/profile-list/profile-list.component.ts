import { Component,OnInit, ViewChild  } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { MatPaginator ,MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common'; // Import CommonModule for DatePipe

interface User {
  name: string;
  dateOfBirth: string;
  address: string;
}
@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [HttpClientModule,MatTableModule,MatPaginatorModule,CommonModule],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.css'
})
export class ProfileListComponent {

  displayedColumns: string[] = ['name', 'dateOfBirth', 'address'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getUsers();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getUsers(): void {
    this.http.get<any[]>('http://localhost:5000/api/profile')
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
  }
}
