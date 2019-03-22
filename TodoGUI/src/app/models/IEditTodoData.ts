import { IPerson } from './IPerson';
import { ITodoItem } from './ITodoItem';

export interface IEditTodoData {
    people: IPerson[];
    todoItem: ITodoItem;
}
