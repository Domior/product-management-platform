export const Title = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return <h1 className={`mb-5 text-3xl font-semibold ${className ?? ''}`}>{children}</h1>;
};
