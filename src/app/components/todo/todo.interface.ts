export interface TodoItem {
  id: number;
  content: string;
}

export enum TodoStatus {
  'TODO' = 'TODO',
  'INPROGRESS' = 'INPROGRESS',
  'DONE' = 'DONE',
};
export const TodoStatusLabelRecord: Record<TodoStatus, string> = {
  TODO: 'To do',
  INPROGRESS: 'In progress',
  DONE: 'Done',
};