'use client';
import { Title } from './components/common/Title';
import { AddTodo } from './components/todo/AddTodo';
import { KanbanBoard } from './components/todo/KanbanBoard';

export default function Home() {

  return (
    <main className={style.main}>
      <div className={style.wrapper}>
        <Title content={'Things to do'} />
        <AddTodo />
        <KanbanBoard />
      </div>
    </main>
  );
}

const style = {
  main: 'min-w-[320px] max-w-[1200px] min-h-screen px-4 py-20 mx-auto sm:px-8',
  wrapper: 'flex flex-col gap-8',
};
