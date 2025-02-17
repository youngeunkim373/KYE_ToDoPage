import { Droppable } from "@hello-pangea/dnd";

import { useTodoContext } from "@/app/context/TodoContext";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { selectedBoard } = useTodoContext();

  return (
    <Droppable droppableId={selectedBoard.id}>
      {(provided, snapshot) => (
        <ul
          className={style.list}
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {selectedBoard.items.length > 0 ? (
            selectedBoard.items.map((todo, index) => (
              <TodoItem
                key={todo.id}
                index={index}
                {...todo} />
            ))) : (
            !snapshot.isDraggingOver && (
              <li className={style.empty}>
                할 일을 등록해주세요
              </li>
            )
          )}
          {provided.placeholder}
        </ul>
      )
      }
    </Droppable >
  );
}

const style = {
  list: 'flex flex-col',
  empty: 'py-8 text-center',
};