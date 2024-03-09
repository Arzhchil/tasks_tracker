import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TaskModel } from '../../../shared/models';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskPriority, TaskStatus } from '../../../shared/enums';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CreateTaskModal } from '../../../shared/modals/createTask-modal/createTask.modal';
import { EditTaskModalComponent } from '../../../shared/modals/edit-task-modal/edit-task-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
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
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatToolbarModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, AfterViewInit {
  dataSource!: MatTableDataSource<TaskModel>;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private router: Router
  ) { }
  tasks: TaskModel[] = [
    {
      id: 1,
      title: 'Task 1',
      name: 'Интерфейс для ООО "Zavod"',
      deadline: new Date("2024-03-07"),
      priority: TaskPriority.Low,
      status: TaskStatus.ToDo,
      assignees: ['Джо Битлз', 'Майк Таргет']
    },
    {
      id: 2,
      title: 'Task 2',
      name: 'Система отчетности',
      deadline: new Date("2023-05-15"),
      priority: TaskPriority.High,
      status: TaskStatus.InProgress,
      assignees: ['Сара Коннор', 'Джон Доу']
    }
  ];
  displayedColumns: string[] = ['id', 'title', 'name', 'deadline', 'priority', 'status', 'assignees'];
  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }
  ngAfterViewInit() {
    this.sorting()
  }
  sorting() {
    let t = this;
    t.dataSource = new MatTableDataSource(t.tasks);
    t.dataSource.sort = t.sort;
    t.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'deadline': return new Date(item.deadline).getTime();
        case 'id': return item.id;
        case 'title': return item.title;
        case 'name': return item.name;
        case 'priority': return item.priority;
        case 'status': return item.status;
        case 'assignees': return item.assignees.join(", ");
        default: return "";
      }
    };
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  openCreateDialog(): void {
    let t = this;
    const dialogRef = t.dialog.open(CreateTaskModal, {
      width: '800px',
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
        t.sorting()
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
          t.sorting()
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
  showDetails(task: TaskModel): void {
    this.router.navigate(['/detail'], { state: { task } });
  }
}
