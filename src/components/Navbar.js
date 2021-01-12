import React from "react";
import { Icon, Button, Text } from "native-base";

export const Navbar = () => (
  <Footer>
    <FooterTab>
      <Button vertical>
        <Icon name="apps" />
        <Text>Home</Text>
      </Button>
      <Button vertical>
        <Icon name="camera" />
        <Text>Vorsorge</Text>
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
