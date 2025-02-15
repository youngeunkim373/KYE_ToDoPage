'use client';
import { DragEvent, useRef } from 'react';
import { Bars } from '@/app/assets/icons/Bars';
import { Trash } from '@/app/assets/icons/Trash';
import { useTodoContext } from '@/app/context/TodoContext';
import { TodoItem } from './todo.interface';

/* -------------------- List ---------------------- */
interface Props {
  title: string;
  items: TodoItem[];
}

export function TodoList({ title, items }: Props) {

  return (
    <div className={listStyle.wrapper}>
      <p className={listStyle.title}>{title}</p>
      <ul className={listStyle.list}>
        {items.length > 0 ? (
          items.map((item) => <ListItem key={item.id} item={item} />)
        ) : (
          <li className={`${listStyle.list} ${listStyle.empty}`}>할 일을 등록해주세요</li>
        )}
      </ul>
    </div>
  );
}

const listStyle = {
  wrapper: 'w-full',
  list: 'flex flex-col justify-center bg-gray-100 rounded-md',
  empty: 'h-[58px] items-center',
  title: 'text-lg font-semibold pb-4',
};

/* ------------------- ListItem ------------------ */
interface ItemProps {
  item: TodoItem;
}

function ListItem({ item }: ItemProps) {
  const { removeItem } = useTodoContext();

  return (
    <li className={itemStyle.wrapper}>
      <span onClick={() => removeItem(item.id)} >{item.content}</span>
      <button
        className={itemStyle.remove}
        onClick={() => removeItem({ id: item.id, status: item.status })} >
        <Trash className={itemStyle.icon} />
      </button>
    </li>
  );
}

const itemStyle = {
  wrapper: 'flex items-center gap-3 px-8 py-4 border border-1 border-transparent break-all',
  icon: 'min-w-[24px] text-gray-400 hover:text-gray-800 active:text-gray-800 cursor-pointer',
  remove: 'ml-auto ',
};

