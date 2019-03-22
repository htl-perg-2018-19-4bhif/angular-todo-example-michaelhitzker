import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPerson } from '../models/IPerson';
import { IAddTodoData } from '../models/IAddTodoData';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  data: IAddTodoData = {
    description: '',
    assignedTo: '',
  };

  canAdd: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public people: IPerson[]) { }

  ngOnInit() {
    this.checkCanAdd();
  }

  checkCanAdd() {
    this.canAdd = this.data.description.length > 0;
  }

  clear() {
    this.data.assignedTo = null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
