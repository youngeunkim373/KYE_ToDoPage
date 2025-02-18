import { useTodoContext } from '@/app/context/TodoContext';
import { Title } from '../common/Title';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';

interface Props {
  className?: string;
}

export function TodoBoard({ className = '' }: Props) {
  const { selectedBoard } = useTodoContext();

  return (
    <section className={className}>
      <Title
        className={`
            text-4xl font-medium
            ${selectedBoard?.title ? 'visible' : 'invisible'}
            `}
        content={selectedBoard?.title ?? ''} />
      <AddTodo />
      <TodoList />
    </section>
  );
}