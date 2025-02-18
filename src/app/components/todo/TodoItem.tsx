import { useEffect, useRef, useState } from "react";

import { Bars } from "@/app/assets/icons/Bars";
import { Edit } from "@/app/assets/icons/Edit";
import { Trash } from "@/app/assets/icons/Trash";
import { Input } from "../common/Input";
import { useTodoContext } from "@/app/context/TodoContext";
import { TodoItemProps } from "./todo.interface";

interface Props {
  id: TodoItemProps['id'];
  content: string;
}

export function TodoItem({ id, content }: Props) {
  const { editTodo, removeTodo } = useTodoContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditable, setEditable] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // TODO 아무것도 입력 안했을 때 nofi 띄우기
      if (!inputRef.current) return;

      if (isEditable && !inputRef.current.contains(e.target as Node)) {
        if (inputRef.current.value) editTodo({ id, content: inputRef.current.value });
        setEditable(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditable]);

  return (
    <li className={style.item}>
      <Bars className={style.icon.common} />

      <div className={style.content.wrapper}>
        {isEditable ? (
          <Input
            allowClear={false}
            className={style.content.input}
            defaultValue={content}
            ref={inputRef} />
        ) : (
          <span className={style.content.span}>
            {content}
          </span>
        )}
      </div>

      <div className={style.buttons.wrapper}>
        <button onClick={() => setEditable(true)} >
          <Edit className={`${style.icon.common} ${style.icon.edit}`} />
        </button>
        <button onClick={() => removeTodo(id)} >
          <Trash className={`${style.icon.common} ${style.icon.remove}`} />
        </button>
      </div>
    </li>
  );
}

const style = {
  item: `
      flex items-center gap-3
      rounded-lg
      px-4 py-2
      cursor-pointer
      hover:bg-gray-100
      `,
  icon: {
    common: 'min-w-[20px] size-5 text-gray-400',
    edit: 'hover:text-blue',
    remove: 'hover:text-red-500',
  },
  content: {
    wrapper: 'w-full overflow-auto scrollbar-hide',
    input: 'w-full h-[23px] bg-transparent !p-0',
    span: 'inline-block min-w-[160px]',
  },
  buttons: {
    wrapper: 'flex gap-2 ml-auto',
  },
};