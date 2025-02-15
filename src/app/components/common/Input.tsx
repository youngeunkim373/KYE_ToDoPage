import { forwardRef, InputHTMLAttributes, RefObject } from 'react';
import { Close } from '@/app/assets/icons/Close';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const handleClear = () => {
    const inputRef = ref as RefObject<HTMLInputElement>;
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={style.wrapper}>
      <input
        className={style.input}
        ref={ref}
        {...props} />
      <div
        className={style.clear.wrapper}
        onClick={handleClear}>
        <Close className={style.clear.close} />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

const style = {
  wrapper: `
    w-full 
    relative
    flex items-center
    bg-white
    ring-1 ring-inset ring-blue rounded-md
    px-4 py-2
    focus-within:ring-[1.3px]
  `,
  input: `
    text-base
    w-full
    placeholder:text-gray-400
  `,
  clear: {
    wrapper: 'p-1 ml-1 relative left-1 my-auto cursor-pointer',
    close: 'text-gray-400 hover:text-gray-500',
  },
};