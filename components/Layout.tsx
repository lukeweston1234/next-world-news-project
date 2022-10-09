import React from "react";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="">
      <Header />
      <div>
        <main className="h-screen">{children}</main>
      </div>
    </div>
  );
}
