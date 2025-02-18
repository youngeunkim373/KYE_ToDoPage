import { useTodoContext } from "@/app/context/TodoContext";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { selectedBoard } = useTodoContext();

  return (
    <ul className={style.list}>
      {(selectedBoard?.items ?? []).map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo} />
      ))}
    </ul>
  );
}

const style = {
  list: 'flex flex-col',
  empty: 'py-8 text-center',
};