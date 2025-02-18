import { BoardItem } from "./BoardItem";

const testList = [
  { id: 'TODO', title: 'To do' },
  { id: 'INPROGRESS', title: 'In progress' },
  { id: 'DONE', title: 'done' },
];

export function BoardList() {

  return (
    <ul className={style.list} >
      {testList.length > 0 ? (
        testList.map((board) => (
          <BoardItem
            key={board.id}
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