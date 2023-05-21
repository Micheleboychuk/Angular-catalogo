import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CatalogListComponent } from './features/catalog/catalog/calatalo-list.component';
import { CatalogFormComponent } from './features/catalog/catalog-form.component';
import { OsIconComponent } from './features/catalog/components/os-icon.component';
import { CardComponent } from './shared/components/card.component';
import { NavbarComponent } from './core/components/navbar.component';
import { HomeComponent } from './features/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    // features: catalog
    CatalogComponent,
    CatalogListComponent,
    CatalogFormComponent,
    OsIconComponent,
    // shared
    CardComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
