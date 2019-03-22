import { Component, OnInit, Inject } from '@angular/core';
import { ITodoItem } from '../models/ITodoItem';
import { IEditTodoData } from '../models/IEditTodoData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPerson } from '../models/IPerson';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  canSave: boolean;
  todoItem: ITodoItem;
  people: IPerson[];

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditTodoData) {
    this.todoItem = data.todoItem;
    this.people = data.people;
  }

  ngOnInit() {
    this.checkCanAdd();
  }

  checkCanAdd() {
    this.canSave = this.todoItem.description.length > 0;
  }

  clear() {
    this.todoItem.assignedTo = null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
