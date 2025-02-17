import { DragDropContext } from '@hello-pangea/dnd';

import { useTodoContext } from '@/app/context/TodoContext';
import { Title } from '../common/Title';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';

interface Props {
  className?: string;
}

export function TodoBoard({ className = '' }: Props) {
  const { selectedBoard, reorderTodoOnDragEnd } = useTodoContext();

  return (
    <DragDropContext onDragEnd={reorderTodoOnDragEnd}>
      <section className={className}>
        <Title
          className={'!text-4xl !font-medium'}
          content={selectedBoard.title} />
        <AddTodo />
        <TodoList />
      </section>
    </DragDropContext>
  );
}