import { useEffect, useRef, useState } from "react";

import { Bars } from "@/app/assets/icons/Bars";
import { Edit } from "@/app/assets/icons/Edit";
import { Trash } from "@/app/assets/icons/Trash";
import { useTodoContext } from "@/app/context/TodoContext";
import { Input } from "../common/Input";
import { BoardProps } from "./board.interface";

interface Props {
  id: BoardProps['id'];
  title: BoardProps['title'];
}

export function BoardItem({ id, title }: Props) {
  const { editBoard } = useTodoContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditable, setEditable] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!inputRef.current) return;

      if (isEditable && !inputRef.current.contains(e.target as Node)) {
        if (inputRef.current.value) editBoard({ id, title: inputRef.current.value });
        setEditable(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditable]);

  return (
    <li
      className={style.item}>
      <Bars className={style.icon.common} />

      <div
        className={style.content.wrapper}>
        {isEditable ? (
          <Input
            allowClear={false}
            className={style.content.input}
            defaultValue={title}
            ref={inputRef} />
        ) : (
          <span className={style.content.span}>
            {title}
          </span>
        )}
      </div>

      <div className={style.buttons.wrapper}>
        <button onClick={() => setEditable(true)} >
          <Edit className={`${style.icon.common} ${style.icon.edit}`} />
        </button>
        <button>
          <Trash className={`${style.icon.common} ${style.icon.remove}`} />
        </button>
      </div>
    </li>
  );
}

const style = {
  item: `
      max-w-[320px]
      flex items-center gap-3
      rounded-lg
      px-4 py-3
      cursor-pointer
      hover:bg-white
      `,
  icon: {
    common: 'min-w-[20px] size-5 text-gray-400',
    edit: 'hover:text-blue',
    remove: 'hover:text-red-500',
  },
  content: {
    wrapper: 'max-w-[160px] overflow-auto scrollbar-hide',
    input: '!w-full h-[23px] bg-transparent !p-0',
    span: 'inline-block min-w-[160px]',
  },
  buttons: {
    wrapper: 'flex gap-2 ml-auto',
  },
};