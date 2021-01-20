import React from "react";
import { Appbar } from "react-native-paper";

import { mainCol } from "../styles";

export const Headerbar = ({ title, subtitle }) => {
  return (
    <Appbar.Header style={{ backgroundColor: mainCol }}>
      <Appbar.Content title={title} subtitle={subtitle} />
    </Appbar.Header>
  );
};
