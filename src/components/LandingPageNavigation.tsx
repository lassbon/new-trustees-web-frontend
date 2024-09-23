import {
  ButtonGroup,
  Flex,
  HStack,
  Button,
  Image,
  Show,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Hide,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "../assets/images/logo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { navMenuData } from "../config/data";

type Props = {
  onScrollToSection: (section: string) => void;
};

const LandingPageNavigation = ({ onScrollToSection }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Flex
      justify="space-between"
      align="center"
      py="20px"
      px="5vw"
      as={"nav"}
      position="absolute"
      w="100%"
      zIndex={2}
    >
      <Image boxSize="100px" objectFit="contain" src={Logo} alt="Dan Abramov" />

      {/* large screen */}
      <Show above="lg">
        <List>
          <HStack
            spacing="2vw"
            textColor={
              location.pathname === "/Recommendation" ? "black" : "white"
            }
          >
            {navMenuData.slice(0, -1).map((nav, i) => (
              <ListItem key={i}>
                {nav?.link ? (
                  <NavLink to={nav.link && nav.link}>{nav.label}</NavLink>
                ) : nav?.id ? (
                  <Text
                    onClick={() => onScrollToSection(nav?.id)}
                    cursor={"pointer"}
                  >
                    {nav.label}
                  </Text>
                ) : null}
              </ListItem>
            ))}
          </HStack>
        </List>
        <ButtonGroup spacing="6">
          <Button
            colorScheme="blackAlpha"
            borderRadius="100px"
            w="7vw"
            onClick={() => navigate("auth/SignIn")}
          >
            Log in
          </Button>
          <Button
            variant="solid"
            bgColor="white"
            textColor="green"
            borderRadius="100px"
            onClick={() => navigate("auth/SignUp")}
          >
            Get Started
          </Button>
        </ButtonGroup>
      </Show>

      {/* small screen */}
      <Hide above="lg">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon color="white" />}
            colorScheme="green"
          />
          <MenuList>
            {navMenuData.map((nav, i) => (
              <MenuItem key={i}>
                {nav?.link ? (
                  <NavLink to={nav.link && nav.link} style={{ width: "100%" }}>
                    {nav.label}
                  </NavLink>
                ) : nav?.id ? (
                  <Text onClick={() => onScrollToSection(nav?.id)} w="100%">
                    {nav.label}
                  </Text>
                ) : null}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Hide>
    </Flex>
  );
};

export default LandingPageNavigation;
