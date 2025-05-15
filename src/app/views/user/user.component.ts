import { Component } from '@angular/core';
import { UserContentComponent } from '../../../components/user-content/user-content.component';

@Component({
  selector: 'app-user',
  imports: [UserContentComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
