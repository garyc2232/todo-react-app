import { Status } from './status.type';
import { Tag } from './tag.type';

export enum TodoStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export interface Todo {
  id: number;
  name: string;
  description: string;
  dueDate: Date | string;
  createAt: Date;
  status: TodoStatus;
  priority: number;
  tags: Tag[];
}

export interface TodoCreateDto
  extends Omit<Todo, 'id' | 'createAt' | 'status'> {}

export interface TodoUpdateDto
  extends Omit<Todo, 'id' | 'tags' | 'createAt' | 'status'> {
  tags: Tag['id'][];
  status: Status['id'];
}
