import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PomodoroComponent } from './components/pomodoro/pomodoro.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { KanbanComponent } from './components/kanban/kanban.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pomodoro', component: PomodoroComponent },
  { path: 'todo', component: TodoListComponent},
  { path: 'kanban', component: KanbanComponent},
  // Adicione mais rotas conforme necessário
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Rota padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
