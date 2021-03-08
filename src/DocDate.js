import React from "react";
import * as Notifications from "expo-notifications";

import { Navbar } from "./components/Navbar";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const DocDate = () => {
  return <Navbar />;
};

export default DocDate;
