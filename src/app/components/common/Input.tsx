import { forwardRef, InputHTMLAttributes, RefObject } from 'react';
import { Close } from '@/app/assets/icons/Close';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  allowClear?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(({
  allowClear = true,
  className,
  ...props
}, ref) => {
  const handleClear = () => {
    const inputRef = ref as RefObject<HTMLInputElement>;
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      className={`${style.wrapper} ${className}`}>
      <input
        className={style.input}
        ref={ref}
        {...props} />
      {allowClear && (
        <div
          className={style.clear.wrapper}
          onClick={handleClear}>
          <Close className={style.clear.close} />
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

const style = {
  wrapper: `
    w-full 
    flex items-center 
    ring-1 ring-inset ring-blue rounded-md 
    px-4 py-2 bg-white  
    focus-within:ring-[1.3px]
  `,
  input: 'w-full text-base placeholder:text-gray-400',
  clear: {
    wrapper: 'p-1 ml-1 relative left-1 my-auto cursor-pointer',
    close: 'text-gray-400 hover:text-gray-500',
  },
};