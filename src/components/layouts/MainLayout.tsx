export const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="main-layout">{children}</div>;
};
