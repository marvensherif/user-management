import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  dateOfBirth = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  profileForm!: FormGroup;
  message = '';
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {}

  convertToMySQLDateFormat(date: any): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: this.name,
      dateOfBirth: this.dateOfBirth,
      address: this.address
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

  async saveProfile(): Promise<void> {
    if (this.profileForm.valid) {
      this.profileForm.value.dateOfBirth = this.convertToMySQLDateFormat(this.profileForm.value.dateOfBirth);
      console.log('Profile saved:', this.profileForm.value);
      this.message = "Saving in progress...";
      this.openSnackBar(this.message);
      await this.delay(1000);
      this.http.post('http://localhost:5000/api/profile', this.profileForm.value)
        .subscribe({
          next: (response) => {
            console.log('Profile saved:', response);
            this.openSnackBar("Saved Successfully");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          error: (error) => {
            console.error('Error saving profile:', error);
            this.openSnackBar("Error saving profile. Please try again.");
          }
        });
    } else {
      this.message = "Form Is Invalid. Try Again Later...";
      this.openSnackBar(this.message);
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
