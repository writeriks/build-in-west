import type { ReactNode } from "react";
import NavigationBar from "../componenets/navigation-bar/navigation-bar";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  metaImage?: string;
  metaUrl?: string;
  sectionClassNames?: {
    main?: string;
  };
}

const MainLayout = (props: MainLayoutProps) => (
  <div className="mx-auto flex min-h-screen w-screen flex-col">
    <NavigationBar />
    {props.children}
  </div>
);

export default MainLayout;
