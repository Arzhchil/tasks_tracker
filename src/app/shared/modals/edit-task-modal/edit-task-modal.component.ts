import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TaskStatus } from '../../enums';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatListModule,
    MatChipsModule,
    MatDialogModule,
    NgForOf,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss'
})
export class EditTaskModalComponent implements OnInit {
  editTaskForm!: FormGroup;
  statuses: any[] = [
    { value: TaskStatus.ToDo, viewValue: 'Сделать' },
    { value: TaskStatus.InProgress, viewValue: 'В процессе' },
    { value: TaskStatus.Done, viewValue: 'Готово' }
  ];
  id: number;
  assignees: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    this.id = data.id
    this.assignees = data.assignees;
  }
  ngOnInit(): void {
    this.editTaskForm = this.formBuilder.group({
      id: [this.data.id, Validators.required],
      status: [this.data.status, Validators.required],
      assignees: [this.data.assignees, Validators.required],
    });
  }
  add(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.assignees.push(value);
    }
    event.chipInput!.clear();
  }
  remove(assignee: any): void {
    const index = this.assignees.indexOf(assignee);
    if (index >= 0) {
      this.assignees.splice(index, 1);
    }
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
