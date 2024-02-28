import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PomodoroComponent } from './components/pomodoro/pomodoro.component';
import { TimerComponent } from './components/timer/timer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PomodoroComponent,
    TimerComponent,
    HeaderComponent,
    MenuComponent,
    DashboardComponent,
    TodoListComponent,
    KanbanComponent,
    FilterTasksPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
