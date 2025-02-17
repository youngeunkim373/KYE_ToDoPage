import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { Bars } from '@/app/assets/icons/Bars';
import { Edit } from '@/app/assets/icons/Edit';
import { Trash } from '@/app/assets/icons/Trash';
import { useTodoContext } from '@/app/context/TodoContext';
import { Input } from '../common/Input';
import { TodoItemProps, TodoStatus } from './todo.interface';

interface ItemProps {
  index: number;
  item: TodoItemProps;
  status: TodoStatus;
}

export function TodoItem({ item, index, status }: ItemProps) {
  const [isEditable, setEditable] = useState(false);
  const { editItem, removeItem } = useTodoContext();

  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {(provided) => (
        <li
          className={style.wrapper}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Bars className={style.icon} />
          {/* <span>{item.content}</span> */}
          <Input
            defaultValue={item.content}
            readOnly={!isEditable} />

          <div className={style.buttons.wrapper}>
            <button onClick={() => setEditable((prev) => !prev)} >
              <Edit className={style.icon} />
            </button>
            <button onClick={() => removeItem({ id: item.id, status })} >
              <Trash className={style.icon} />
            </button>
          </div>
        </li>
      )
      }
    </Draggable >
  );
}

const style = {
  wrapper: 'flex items-center gap-3 px-4 py-2 break-all border-b border-b-transparent border-t border-t-transparent',
  icon: 'min-w-[24px] text-gray-400 hover:text-gray-800 active:text-gray-800 cursor-pointer',
  buttons: {
    wrapper: 'flex gap-2 ml-auto',
  },
};

