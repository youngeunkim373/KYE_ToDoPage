import { TodoItemProps } from "../todo/todo.interface";

export interface BoardProps {
  id: string;
  title: string;
  items: TodoItemProps[];
}