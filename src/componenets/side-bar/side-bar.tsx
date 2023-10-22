import React from "react";
import { useSelector } from "react-redux";
import uiReducerSelector from "../../store/reducers/ui-reducer/ui-reducer-selector";

const SideBar = () => {
  const isHamburgerMenuOpen = useSelector(
    uiReducerSelector.getIsHamburgerMenuOpen
  );
  return <div>SideBar</div>;
};

export default SideBar;
