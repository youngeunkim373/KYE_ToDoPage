interface Props {
  className?: string;
}

export function TodoBoard({ className = '' }: Props) {
  return (
    <section className={className}>
    </section>
  );
}