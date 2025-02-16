'use client';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Bars } from '@/app/assets/icons/Bars';
import { Trash } from '@/app/assets/icons/Trash';
import { useTodoContext } from '@/app/context/TodoContext';
import { TodoItem, TodoStatus } from './todo.interface';

/* -------------------- TodoList ---------------------- */
interface Props {
  items: TodoItem[];
  status: TodoStatus;
  title: string;
}

export function TodoList({ items, status, title }: Props) {

  return (
    <div className={listStyle.wrapper}>
      <p className={listStyle.title}>{title}</p>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <ul
            className={listStyle.list}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {items.length > 0 ? (
              items.map((item, index) => (
                <ListItem
                  key={item.id}
                  index={index}
                  item={item}
                  status={status} />
              ))
            ) : (
              !snapshot.isDraggingOver && (
                <li className={`${listStyle.list} ${listStyle.empty}`}>
                  할 일을 등록해주세요
                </li>
              )
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}

const listStyle = {
  wrapper: 'w-full',
  list: 'min-h-[58px] flex flex-col justify-center bg-gray-100 rounded-md',
  empty: 'items-center',
  title: 'text-lg font-semibold pb-4',
};

/* ------------------- ListItem ------------------ */
interface ItemProps {
  index: number;
  item: TodoItem;
  status: TodoStatus;
}

function ListItem({ item, index, status }: ItemProps) {
  const { removeItem } = useTodoContext();

  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {(provided) => (
        <li
          className={itemStyle.wrapper}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Bars className={itemStyle.icon} />
          <span>{item.content}</span>
          <button
            className={itemStyle.remove}
            onClick={() => removeItem({ id: item.id, status })} >
            <Trash className={itemStyle.icon} />
          </button>
        </li>
      )}
    </Draggable >
  );
}

const itemStyle = {
  wrapper: 'flex items-center gap-3 px-8 py-4 break-all border-b border-b-transparent border-t border-t-transparent',
  icon: 'min-w-[24px] text-gray-400 hover:text-gray-800 active:text-gray-800 cursor-pointer',
  remove: 'ml-auto ',
};

