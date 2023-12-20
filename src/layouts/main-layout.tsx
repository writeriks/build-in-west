import { type ReactNode } from "react";
import NavigationBar from "../componenets/navigation-bar/navigation-bar";
import SideBarMenu from "../componenets/side-bar-menu/side-bar-menu";
import { useSelector } from "react-redux";
import uiReducerSelector from "../store/reducers/ui-reducer/ui-reducer-selector";

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

const MainLayout = (props: MainLayoutProps) => {
  const isHamburgerMenuOpen = useSelector(
    uiReducerSelector.getIsHamburgerMenuOpen
  );

  return (
    <div className="mx-auto flex min-h-screen w-screen flex-col">
      <SideBarMenu isHamburgerMenuOpen={isHamburgerMenuOpen} />
      <NavigationBar />
      {props.children}
    </div>
  );
};

export default MainLayout;
