'use client';
import { Title } from './components/common/Title';
import { AddTodo } from './components/todo/AddTodo';
import { TodoList } from './components/todo/TodoList';
import { useTodoContext } from './context/TodoContext';

export default function Home() {
  const { list } = useTodoContext();

  return (
    <main className={style.main}>
      <Title content={'Things to do'} />
      <AddTodo />
      <TodoList items={list} />
    </main>
  );
}

const style = {
  main: 'w-[300px] min-h-screen flex flex-col gap-8 items-center mx-auto py-20',
};
