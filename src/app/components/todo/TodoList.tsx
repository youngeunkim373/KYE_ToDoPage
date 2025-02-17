import { Droppable } from '@hello-pangea/dnd';
import { TodoItemProps, TodoStatus } from './todo.interface';
import { TodoItem } from './TodoItem';

/* -------------------- TodoList ---------------------- */
interface Props {
  items: TodoItemProps[];
  status: TodoStatus;
  title: string;
}

export function TodoList({ items, status, title }: Props) {

  return (
    <div className={style.wrapper}>
      <p className={style.title}>{title}</p>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <ul
            className={style.list}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {items.length > 0 ? (
              items.map((item, index) => (
                <TodoItem
                  key={item.id}
                  index={index}
                  item={item}
                  status={status} />
              ))
            ) : (
              !snapshot.isDraggingOver && (
                <li className={`${style.list} ${style.empty}`}>
                  할 일을 등록해주세요
                </li>
              )
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

const style = {
  wrapper: 'w-full',
  list: 'min-h-[58px] flex flex-col justify-center bg-gray-100 rounded-md',
  empty: 'items-center',
  title: 'text-lg font-semibold pb-4',
};