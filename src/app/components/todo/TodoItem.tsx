import { useRef, useState } from "react";

import { Bars } from "@/app/assets/icons/Bars";
import { Edit } from "@/app/assets/icons/Edit";
import { Trash } from "@/app/assets/icons/Trash";
import { Input } from "../common/Input";

interface Props {
  content: string;
}

export function TodoItem({ content }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditable, setEditable] = useState(false);

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
        <button onClick={() => setEditable(prev => !prev)} >
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