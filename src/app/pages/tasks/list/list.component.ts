import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../../shared/models';
import { CommonModule } from '@angular/common';
import { TaskPriority, TaskStatus } from '../../../shared/enums';
import { MatTableModule } from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import { CreateTaskModal } from '../../../shared/modals/createTask-modal/createTask.modal';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    MatTableModule,
    CreateTaskModal,
    MatListModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  tasks: TaskModel[] = [
    {
      id: 1,
      title: 'Task 1',
      name: 'Интерфейс для ООО <<Zavod>>',
      deadline: new Date("2024-03-07"),
      priority: TaskPriority.Low,
      status: TaskStatus.ToDo,
      assignees: ['Джо Битлз', 'Майк Таргет']
    },
    {
      id: 2,
      title: 'Task 2',
      name: 'Рефакторинг кода',
      deadline: new Date("2024-06-08"),
      priority: TaskPriority.High,
      status: TaskStatus.Done,
      assignees: ['Майк Таргет']
    }
  ];
  displayedColumns: string[] = ['id', 'title', 'name', 'deadline', 'priority', 'status', 'assignees'];

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }

  openTaskFormDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskModal, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let t = this;
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        t.tasks.push({
          ...result,
          id: t.tasks.length + 1,
          deadline: new Date(result.deadline)
        });
        t.saveTasksToLocalStorage()
        t.loadTasksFromLocalStorage();
      }
    });
  }
  saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  loadTasksFromLocalStorage(): void {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

}
