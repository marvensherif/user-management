import { Component } from '@angular/core';
import {ProfileFormComponent} from "../../components/profile-form/profile-form.component"
import {ProfileListComponent} from "../../components/profile-list/profile-list.component"
import {QueryFormComponent} from "../../components/query-form/query-form.component"
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-add-user-page',
  standalone: true,
  imports: [ProfileFormComponent,ProfileListComponent,MatTabsModule,QueryFormComponent],
  templateUrl: './add-user-page.component.html',
  styleUrl: './add-user-page.component.css'
})
export class AddUserPageComponent {

}
