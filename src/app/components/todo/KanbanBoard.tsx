import { useTodoContext } from '@/app/context/TodoContext';
import { TodoList } from './TodoList';
import { TodoStatusLabelRecord } from './todo.interface';

export function KanbanBoard() {
  const { list } = useTodoContext();

  return (
    <div className={style.wrapper}>
      <TodoList title={TodoStatusLabelRecord['TODO']} items={list['TODO']} />
      <TodoList title={TodoStatusLabelRecord['INPROGRESS']} items={list['INPROGRESS']} />
      <TodoList title={TodoStatusLabelRecord['DONE']} items={list['DONE']} />
    </div >
  );
}

const style = {
  wrapper: 'w-full max-w-[1200px] flex flex-col flex-1 gap-12 lg:flex-row lg:gap-4',
};