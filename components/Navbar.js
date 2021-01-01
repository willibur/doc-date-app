import React from "react";
import { Icon, Button, Text, Footer, FooterTab } from "native-base";
export const Navbar = () => (
  <Footer>
    <FooterTab>
      <Button vertical>
        <Icon name="apps" />
        <Text>Home</Text>
      </Button>
      <Button vertical>
        <Icon name="camera" />
        <Text>Akte</Text>
      </Button>
      <Button vertical active>
        <Icon active name="navigate" />
        <Text>Kalender</Text>
      </Button>
      <Button vertical>
        <Icon name="person" />
        <Text>Profil</Text>
      </Button>
    </FooterTab>
  </Footer>
);
