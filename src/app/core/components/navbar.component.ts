import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mb-navbar',
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark text-white">
      <a class="navbar-brand">LOGO</a>
      <div class="navbar-collapse collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link"
              routerLink="/home"
              routerLinkActive="active">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" 
               routerLinkActive="active" 
               routerLink="/catalog">Catalog</a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
