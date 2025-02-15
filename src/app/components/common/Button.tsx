import { ButtonHTMLAttributes } from 'react';

export function Button({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${style} ${className}`}
      {...props}>
      {children}
    </button>
  );
}

const style = `
  flex justify-center items-center
  text-base text-white font-semibold
  bg-blue rounded-md
  px-4 py-2
  transition-all duration-200
  hover:bg-blue-light
`;