import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationsItem";
import DrawerToggler from "../SideDrawer/DrawerToggler/DrawerToggler";

const toolBar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggler clicked={props.toggle} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolBar;
