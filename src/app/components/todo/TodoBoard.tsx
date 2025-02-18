import { Title } from "../common/Title";
import { AddTodo } from "./AddTodo";
import { TodoList } from "./TodoList";

interface Props {
  className?: string;
}

export function TodoBoard({ className = '' }: Props) {
  return (
    <section className={className}>
      <Title
        className={'text-4xl font-medium'}
        content={'할 일 목록'} />
      <AddTodo />
      <TodoList />
    </section>
  );
}