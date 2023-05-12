import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CatalogListComponent } from './features/catalog/catalog/calatalo-list.component';
import { CatalogFormComponent } from './features/catalog/catalog-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    CatalogListComponent,
    CatalogFormComponent
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
