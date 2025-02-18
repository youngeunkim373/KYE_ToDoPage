import { useTodoContext } from '@/app/context/TodoContext';
import { Title } from '../common/Title';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';

interface Props {
  className?: string;
}

export function TodoBoard({ className = '' }: Props) {
  const { selectedBoard } = useTodoContext();

  return (
    <section className={className}>
      {!selectedBoard ? (
        <span className={style.empty}>나의 목록을 만들어주세요!</span>
      ) : (
        <>
          <Title
            className={`text-4xl font-medium min-h-[40px]`}
            content={selectedBoard?.title ?? ''} />
          <AddTodo />
          <TodoList />
        </>
      )}
    </section>
  );
}

const style = {
  empty: 'flex justify-center items-center my-auto'
}