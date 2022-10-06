import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="">
      <Header />
      <main className="h-screen">{children}</main>
    </div>
  );
}
