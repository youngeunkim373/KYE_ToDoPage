import { TodoItem } from "./TodoItem";

const testList = [
  { id: 'workout1', content: '운동하기1', status: false },
  { id: 'workout2', content: '운동하기2', status: false },
  { id: 'workout3', content: '운동하기3', status: false },
];

export function TodoList() {

  return (
    <ul
      className={style.list}>
      {testList.map((todo, index) => (
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