import { Droppable } from "@hello-pangea/dnd";

import { useTodoContext } from "@/app/context/TodoContext";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { selectedBoard } = useTodoContext();

  if (!selectedBoard) {
    return (
      <span className={style.empty}>
        할 일을 등록해주세요
      </span>
    )
  }

  return (
    <Droppable droppableId={selectedBoard?.id} isCombineEnabled>
      {(provided) => (
        <ul
          className={style.list}
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {selectedBoard.items.map((todo, index) => (
            <TodoItem
              key={todo.id}
              index={index}
              {...todo} />
          ))}
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