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
  Avatar,
  Divider,
  HStack,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Link,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "../config/data";

import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../assets/images/logo2.png";
import chatOnWhatsapp from "../assets/images/chatonwhatsapp.png";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { colors } from "../constants/colors";

type Props = {
  handleLogout: () => void;
  info: any;
};

const DashBoardPageNavigation = ({ handleLogout, info }: Props) => {
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
      w={"100%"}
      position={"fixed"}
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
                          {/* @ts-ignore */}
                          <ListIcon as={isActive ? nav?.icons2 : nav?.icon} />
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
              top={{ base: "10vh", lg: "25vh" }}
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
              <Link href="https://wa.me/07025640071" isExternal>
                <Image
                  width={"50vw"}
                  height={"10vh"}
                  objectFit="contain"
                  src={chatOnWhatsapp}
                  alt="WhatsApp"
                />
              </Link>
            </VStack>
            {/* contact info */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <HStack>
        {/* <Center>
          <IconButton
            variant={"unstyled"}
            color={"black"}
            aria-label="show"
            size="xl"
            icon={<IoIosNotificationsOutline />}
          />
        </Center> */}
        <Divider orientation="vertical" h={"3vh"} />
        <Avatar
          name={info ? `${info?.surname} ${info?.othernames}` : ""}
          src={info?.picture_url}
          size="sm"
          bgColor={colors.green_01}
          color={"white"}
        />
        <Menu>
          <MenuButton
            px={4}
            py={1}
            transition="all 0.2s"
            _hover={{ bg: "green.100" }}
            _expanded={{ bg: "green.400" }}
            _focus={{ boxShadow: "outline" }}
            textTransform={"capitalize"}
          >
            <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default DashBoardPageNavigation;
