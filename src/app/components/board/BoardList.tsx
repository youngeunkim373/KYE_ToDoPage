import { Droppable } from "@hello-pangea/dnd";

import { useTodoContext } from "@/app/context/TodoContext";
import { BoardItem } from "./BoardItem";

export function BoardList() {
  const { list } = useTodoContext();

  return (
    <Droppable droppableId={'board'}>
      {(provided, snapshot) => (
        <ul
          className={style.list}
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {list.length > 0 ? (
            list.map((board, index) => (
              <BoardItem
                key={board.id}
                id={board.id}
                index={index}
                title={board.title} />
            ))) : (
            !snapshot.isDraggingOver && (
              <li className={style.empty}>
                목록을 등록해주세요
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