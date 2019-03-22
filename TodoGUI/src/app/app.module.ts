import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {
  MatCardModule, MatButtonModule, MatToolbarModule, MatCheckboxModule, MatGridListModule,
  MatSidenavModule, MatInputModule, MatDialogModule, MatSelectModule
} from '@angular/material/';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    AddDialogComponent,
    EditDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
  ]
})
export class AppModule { }
