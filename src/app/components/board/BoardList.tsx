import { useTodoContext } from "@/app/context/TodoContext";
import { BoardItem } from "./BoardItem";

export function BoardList() {
  const { list } = useTodoContext();

  return (
    <ul className={style.list} >
      {list.length > 0 ? (
        list.map((board) => (
          <BoardItem
            key={board.id}
            id={board.id}
            title={board.title} />
        ))) : (
        <li className={style.empty}>
          목록을 등록해주세요
        </li>
      )}
    </ul>
  );
}

const style = {
  list: 'flex flex-col',
  empty: 'py-8 text-center',
};