import { DragDropContext } from '@hello-pangea/dnd';
import { useTodoContext } from '@/app/context/TodoContext';
import { TodoList } from './TodoList';
import { TodoStatus, TodoStatusLabelRecord } from './todo.interface';

export function KanbanBoard() {
  const { list, onDragEndReorderItems } = useTodoContext();

  return (
    <DragDropContext onDragEnd={onDragEndReorderItems}>
      <div className={style.wrapper}>
        <TodoList
          title={TodoStatusLabelRecord['TODO']}
          status={TodoStatus.TODO}
          items={list['TODO']} />
        <TodoList
          title={TodoStatusLabelRecord['INPROGRESS']}
          status={TodoStatus.INPROGRESS}
          items={list['INPROGRESS']} />
        <TodoList
          title={TodoStatusLabelRecord['DONE']}
          status={TodoStatus.DONE}
          items={list['DONE']} />
      </div >
    </DragDropContext>
  );
}

const style = {
  wrapper: 'w-full max-w-[1200px] flex flex-col flex-1 gap-12 lg:flex-row lg:gap-4',
};