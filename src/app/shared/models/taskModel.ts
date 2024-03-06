import { TaskPriority } from "../enums";
import { TaskStatus } from "../enums";

export interface TaskModel {
  id: string;
  title: string;
  name: string;
  deadline: Date;
  priority: TaskPriority;
  status: TaskStatus;
  assignees: string[];
}
