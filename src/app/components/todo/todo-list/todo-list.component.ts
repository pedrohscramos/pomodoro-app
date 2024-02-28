import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    todos: Todo[] = [];
    newTodoTitle: string = '';

    constructor(private todoService: TodoService) { }

    ngOnInit(): void {
      this.getTodos();
    }

    getTodos() {
      this.todoService.getTodos().subscribe(todos => {
        this.todos = todos;
      });
    }

    addTodo(): void {
      if(!this.newTodoTitle.trim()) { return; }
      this.todoService.addTodo({
        title: this.newTodoTitle,
        status: 'todo'
      } as Todo).subscribe(todo => {
        this.todos.push(todo);
        this.newTodoTitle = '';
      });
    }

    toggleComplete(todo: Todo): void {
      todo.status = todo.status === 'todo' ? 'done' : 'todo';
      this.todoService.updateTodo(todo).subscribe();
    }

    deleteTodo(id: number): void{
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      });
    }
}
