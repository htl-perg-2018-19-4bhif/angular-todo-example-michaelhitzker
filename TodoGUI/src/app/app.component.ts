import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodoItem } from './models/ITodoItem';
import { MatDialog } from '@angular/material';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { IPerson } from './models/IPerson';
import { IAddTodoData } from './models/IAddTodoData';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { IEditTodoData } from './models/IEditTodoData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TodoGUI';
  todos: ITodoItem[] = [];
  people: IPerson[] = [];
  sidenavOpened = false;
  userName = '';
  assignedToMe = false;
  onlyUndone = false;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.refresh();
  }

  loadTodos(): void {
    this.http.get<ITodoItem[]>('http://localhost:8081/api/todos').subscribe(todos => {
      if (this.onlyUndone) {
        if (this.assignedToMe && this.userName.length > 0) {
          this.todos = todos.filter(todo => (
            (this.onlyUndone && !todo.done) && (this.assignedToMe && todo.assignedTo.toLowerCase() === this.userName.toLowerCase())
          ));
        } else {
          this.todos = todos.filter(todo => ((this.onlyUndone && !todo.done)));
        }
      } else {
        if (this.assignedToMe && this.userName.length > 0) {
          this.todos = todos.filter(todo => ((this.assignedToMe && todo.assignedTo.toLowerCase() === this.userName.toLowerCase())));
        } else {
          this.todos = todos;
        }
      }
    });
  }

  loadPeople(): void {
    this.http.get<IPerson[]>(`http://localhost:8081/api/people`).subscribe(people => {
      this.people = people;
      console.log(this.people);
    });
  }

  updateTodo(todo: ITodoItem): void {
    this.http.patch(`http://localhost:8081/api/todos/${todo.id}`, todo).subscribe(todos => {
      this.refresh();
    });
  }

  deleteTodo(id: number): void {
    this.http.delete(`http://localhost:8081/api/todos/${id}`).subscribe(todos => {
      this.refresh();
    });
  }

  addNewTodo(todo: IAddTodoData): void {
    this.http.post('http://localhost:8081/api/todos', todo).subscribe(todos => {
      this.refresh();
    });
  }

  toggleSidnav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  refresh(): void {
    this.loadTodos();
    this.loadPeople();
  }

  add(): void {
    this.openAddDialog();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: this.people
    });

    dialogRef.afterClosed().subscribe(todo => {
      if (todo !== undefined) {
        console.log(todo);
        this.addNewTodo(todo);
      }
    });
  }

  editTodo(todo: ITodoItem): void {
    const editData: IEditTodoData = {
      people: this.people,
      todoItem: todo,
    };
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: editData
    });

    dialogRef.afterClosed().subscribe(editedTodo => {
      if (editedTodo !== undefined) {
        console.log(editedTodo);
        this.updateTodo(editedTodo);
      } else {
        this.refresh();
      }
    });
  }

  onDoneChanged(todo: ITodoItem): void {
    this.updateTodo(todo);
  }

  onDeleteTodo(id: number): void {
    this.deleteTodo(id);
  }

  onEditTodo(todo: ITodoItem): void {
    this.editTodo(todo);
  }
}
