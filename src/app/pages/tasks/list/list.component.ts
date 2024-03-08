import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../../shared/models';
import { CommonModule } from '@angular/common';
import { TaskPriority, TaskStatus } from '../../../shared/enums';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { CreateTaskModal } from '../../../shared/modals/createTask-modal/createTask.modal';
import { EditTaskModalComponent } from '../../../shared/modals/edit-task-modal/edit-task-modal.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    MatTableModule,
    CreateTaskModal,
    MatListModule,
    MatButtonModule,
    DatePipe,
    EditTaskModalComponent,
    MatIconModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) { }
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
  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  openTaskFormDialog(): void {
    let t = this;
    const dialogRef = t.dialog.open(CreateTaskModal, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let t = this;
      if (result) {
        t.tasks.push({
          ...result,
          id: t.tasks.length + 1,
          deadline: t.formatDate(result.deadline)
        });
        t.saveTasksToLocalStorage()
        t.loadTasksFromLocalStorage();
      }
    });
  }
  openEditDialog(task: TaskModel): void {
    const dialogRef = this.dialog.open(EditTaskModalComponent, {
      width: '600px',
      data: task
    });
    dialogRef.afterClosed().subscribe(result => {
      let t = this
      if (result) {
        const taskIndex = t.tasks.findIndex(t => t.id === result.id);
        if (taskIndex !== -1) {
          t.tasks[taskIndex].status = result.status;
          t.tasks[taskIndex].assignees = result.assignees;
          console.log(t.tasks[taskIndex])
          t.saveTasksToLocalStorage()
          t.loadTasksFromLocalStorage();
        }
      }
    });
  }
  saveTasksToLocalStorage(): void {
    let t = this;
    localStorage.setItem('tasks', JSON.stringify(t.tasks));
  }
  loadTasksFromLocalStorage(): void {
    let t = this;
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      t.tasks = JSON.parse(tasks);
    }
  }
}
