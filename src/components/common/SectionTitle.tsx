type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className = "",
}: Props) {
  return (
    <h2
      className={`
        mb-5
        text-2xl
        font-extrabold
        tracking-[-0.02em]
        text-[#15111C]
        dark:text-white
        ${className}
      `}
    >
      {children}
    </h2>
  );
}