import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TaskPriority, TaskStatus } from '../../../shared/enums';
import { TaskModel } from '../../models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-createTask-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  templateUrl: 'createTask.modal.html',
  styleUrls: ['createTask.modal.scss']
})

export class CreateTaskModal implements OnInit {
  taskStatusOptions = Object.values(TaskStatus);
  taskPriorityOptions = Object.values(TaskPriority);
  assignees: string[] = ['Джо', 'Френки', 'Вито', 'Генри', 'Марио', 'Пьер', 'Луиджи'];
  public task: TaskModel = new TaskModel;
  public taskForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateTaskModal>) {
    this.taskForm = new FormGroup({
      title: new FormControl(''),
      name: new FormControl(''),
      deadline: new FormControl(''),
      priority: new FormControl(''),
      status: new FormControl(''),
      assignees: new FormControl([])
    });
  }
  onSubmit() {
    this.dialogRef.close(this.taskForm.value);
  }
  ngOnInit() {
  }
}
