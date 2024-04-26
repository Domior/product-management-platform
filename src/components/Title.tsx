export const Title = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <h1 className="text-3xl font-semibold">{children}</h1>;
};
