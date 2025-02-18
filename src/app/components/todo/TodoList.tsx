import { Droppable } from "@hello-pangea/dnd";

import { useTodoContext } from "@/app/context/TodoContext";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { selectedBoard } = useTodoContext();

  return (
    <Droppable
      // 이 컴포넌트 부모(TodoBoard)에서 selectedBoard로 분기쳐서 UI 그리고 있음
      droppableId={selectedBoard!.id}
      isCombineEnabled>
      {(provided) => (
        <ul
          className={style.list}
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {(selectedBoard?.items ?? []).map((todo, index) => (
            <TodoItem
              key={todo.id}
              index={index}
              {...todo} />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable >
  );
}

const style = {
  list: 'flex flex-col',
  empty: 'py-8 text-center',
};