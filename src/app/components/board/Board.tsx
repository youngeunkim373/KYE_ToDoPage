import { Title } from "../common/Title";
import { AddBoard } from "./AddBoard";
import { BoardList } from "./BoardList";

interface Props {
  className?: string;
}

export function Board({ className = '' }: Props) {

  return (
    <section className={className}>
      <Title
        className={'!text-sm'}
        content={'나의 목록'} />
      <AddBoard />
      <BoardList />
    </section>
  );
}