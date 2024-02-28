import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit{
  columns: any = [];
  tasks: any = [];

  draggingTask: any;
  draggingColumn: any;

  availableColors: string[] = ['blue', 'green', 'yellow', 'red', 'purple'];

  constructor(private http: HttpClient, public todoService: TodoService) { }

  ngOnInit(): void {
    this.getColumns();
    this.getTasks();
  }

  getColumns() {
    this.http.get<any>('http://localhost:3000/columns').subscribe(data => {
      this.columns = data;
    });
  }

  getTasks() {
    this.todoService.getTodos().subscribe((data: Todo[]) => {
      this.tasks = data;
    });
  }

  onDragStart(event: any, task: any) {
    this.draggingTask = task;
  }

  onDrop(event: any, columnId: number) {
    event.preventDefault();
    if (this.draggingTask) {
      this.draggingTask.status = columnId;
      // Atualiza a tarefa no servidor (simulação de API REST)
      this.http.put(`http://localhost:3000/tasks/${this.draggingTask.id}`, this.draggingTask)
        .subscribe(() => {
          this.getTasks(); // Atualiza a lista de tarefas após mover o card
        });
      this.draggingTask = null;
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  addTask(title: string, color: string) {
    if (title.trim()) {
      const newTask = { title: title.trim(), status: 1, color: color };
      this.http.post('http://localhost:3000/tasks', newTask)
        .subscribe(() => {
          this.getTasks(); // Atualiza a lista de tarefas após adicionar a nova tarefa
        });
    }
  }

  showTaskDetails(task: any) {
    Swal.fire({
      title: task.title,
      text: `Status: ${this.getColumnById(task.status)?.title}`,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }


  onDragStartColumn(event: any, column: any) {
    this.draggingColumn = column;
  }

  // Manipulador de evento para soltar a coluna
  onDropColumn(event: any, order: number) {
    event.preventDefault();
    if (this.draggingColumn) {
      this.draggingColumn.order = order;
      // Atualiza a coluna no servidor (simulação de API REST)
      this.http.put(`http://localhost:3000/columns/${this.draggingColumn.id}`, this.draggingColumn)
        .subscribe(() => {
          this.getColumns(); // Atualiza a lista de colunas após mover a coluna
        });
      this.draggingColumn = null;
    }
  }

  // Manipulador de evento para permitir a soltura da coluna
  onDragOverColumn(event: any) {
    event.preventDefault();
  }

  getColumnById(id: number) {
    return this.columns.find((column: any) => column.id === id);
  }

  addColumn(title: string) {
    if (title.trim()) {
      const newColumn = { title: title.trim(), order: this.columns.length + 1};
      this.http.post('http://localhost:3000/columns', newColumn)
        .subscribe(() => {
          this.getColumns(); // Atualiza a lista de colunas após adicionar a nova coluna
        });
    }
  }

}
