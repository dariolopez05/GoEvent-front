import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  public isLoggedIn: boolean = false;

  ngOnInit(): void {
      this.isLoggedIn = localStorage.getItem('logeado') === 'true';
    }

}
