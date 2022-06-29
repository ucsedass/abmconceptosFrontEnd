import React from "react";
import { Box } from "@chakra-ui/layout";
import Nav from "./Nav";
const Layout = (props) => {
  return (
    <>
      <Nav />
      {props.children}
    </>
  );
};

export default Layout;
