import { TaskPriority } from "../enums";
import { TaskStatus } from "../enums";

export class TaskModel {
  public id!: number;
  public title!: string;
  public name!: string;
  public deadline!: Date;
  public priority!: TaskPriority;
  public status!: TaskStatus;
  public assignees!: string[];
}
