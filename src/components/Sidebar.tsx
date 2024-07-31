import {
  Flex,
  VStack,
  List,
  ListItem,
  ListIcon,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "../config/data";

import Logo from "../assets/images/logo2.png";

const Sidebar = () => {
  return (
    <Flex direction={"column"} h="100%">
      <Image boxSize="100px" objectFit="contain" src={Logo} alt="Dan Abramov" />
      <List>
        <VStack
          spacing="3vh"
          direction={"column"}
          display={"flex"}
          align={"flex-start"}
          w="100%"
        >
          {sidebarData.map((nav, i) => (
            <NavLink to={nav?.link} end style={{ width: "80%" }} key={i}>
              {({ isActive }) => {
                return (
                  <ListItem
                    color={isActive ? "green" : "white"}
                    bgColor={isActive ? "white" : "transparent"}
                    w="100%"
                    rounded={"md"}
                    p="5px"
                  >
                    <ListIcon as={nav?.icon} />
                    {nav?.label}
                  </ListItem>
                );
              }}
            </NavLink>
          ))}
        </VStack>
      </List>

      {/* contact info */}
      <VStack
        borderColor={"rgba(247, 251, 249, 0.25)"}
        borderWidth={"3px"}
        rounded={"lg"}
        bgColor={"rgba(247, 251, 249, 0.2)"}
        p="16px"
        display={"flex"}
        top={"20vh"}
        position={"relative"}
        color={"white"}
      >
        <Text textAlign={"center"}>Need help? Get in touch with us via</Text>
        <Text
          textAlign={"center"}
          textTransform={"capitalize"}
          as={"b"}
          size={"xs"}
        >
          07025640071
          <br />
          or
          <br />
          mapp@meristemng.com
        </Text>
        <Button
          variant="outline"
          colorScheme="green"
          bgColor={"white"}
          borderRadius="100px"
        >
          Help & Support
        </Button>
      </VStack>
      {/* contact info */}
    </Flex>
  );
};

export default Sidebar;
