export const PageTitle = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <title>{children}</title>;
};
