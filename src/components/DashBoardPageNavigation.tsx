import {
  Image,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
  List,
  ListIcon,
  ListItem,
  VStack,
  Text,
  Button,
  Center,
  Avatar,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "../config/data";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo from "../assets/images/logo2.png";

const DashBoardPageNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      justify="space-between"
      align="center"
      py="10px"
      px="5vw"
      as={"nav"}
      zIndex={5}
      bgColor={"white"}
      h={"7vh"}
    >
      <IconButton
        variant={"unstyled"}
        color={"black"}
        aria-label="show"
        size="lg"
        icon={<RxHamburgerMenu />}
        onClick={() => {
          onOpen();
        }}
      />
      <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent bgColor={"green"} color={"white"}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Image
              boxSize="100px"
              objectFit="contain"
              src={Logo}
              alt="Dan Abramov"
            />
          </DrawerHeader>
          <DrawerBody>
            <List>
              <VStack
                spacing="3vh"
                direction={"column"}
                display={"flex"}
                align={"flex-start"}
                w="100%"
              >
                {sidebarData.map((nav, i) => (
                  <NavLink
                    to={nav?.link}
                    end
                    style={{ width: "80%" }}
                    key={i}
                    onClick={() => {
                      onClose();
                    }}
                  >
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
              top={{ base: "40vh", lg: "25vh" }}
              position={"relative"}
              color={"white"}
            >
              <Text textAlign={"center"}>
                Need help? Get in touch with us via
              </Text>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <HStack>
        <Center>
          <IconButton
            variant={"unstyled"}
            color={"black"}
            aria-label="show"
            size="xl"
            icon={<IoIosNotificationsOutline />}
          />
        </Center>
        <Divider orientation="vertical" h={"3vh"} />
        <Avatar name="" src="" size="sm" />
      </HStack>
    </Flex>
  );
};

export default DashBoardPageNavigation;
