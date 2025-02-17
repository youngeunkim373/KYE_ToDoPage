import { Draggable } from '@hello-pangea/dnd';
import { Bars } from '@/app/assets/icons/Bars';
import { Trash } from '@/app/assets/icons/Trash';
import { useTodoContext } from '@/app/context/TodoContext';
import { TodoItemProps, TodoStatus } from './todo.interface';

interface ItemProps {
  index: number;
  item: TodoItemProps;
  status: TodoStatus;
}

export function TodoItem({ item, index, status }: ItemProps) {
  const { removeItem } = useTodoContext();

  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {(provided) => (
        <li
          className={style.wrapper}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Bars className={style.icon} />
          <span>{item.content}</span>
          <button
            className={style.remove}
            onClick={() => removeItem({ id: item.id, status })} >
            <Trash className={style.icon} />
          </button>
        </li>
      )}
    </Draggable >
  );
}

const style = {
  wrapper: 'flex items-center gap-3 px-8 py-4 break-all border-b border-b-transparent border-t border-t-transparent',
  icon: 'min-w-[24px] text-gray-400 hover:text-gray-800 active:text-gray-800 cursor-pointer',
  remove: 'ml-auto ',
};

