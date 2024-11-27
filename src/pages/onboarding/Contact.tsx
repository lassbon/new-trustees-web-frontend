import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  Center,
  Circle,

} from "@chakra-ui/react";

import { EmailIcon, Icon } from "@chakra-ui/icons";
import { FaWhatsapp } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { colors } from "../../constants/colors";

const Contact = () => {
  return (
    <Flex
      as={"section"}
      id="Contact"
      w="90%"
      direction={"column"}
      gap={"8vh"}
      align={"center"}
    >
      <Box
        bgImage={"url('/images/bgImage2.png')"}
        display={"Flex"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        w="100%"
        h={{ base: "50lvh" }}
        borderRadius={"20px"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        bgColor={"red"}
        color={"white"}
        flexDirection={"column"}
        px={"8vw"}
        gap={"4vh"}
      >
        <Heading color={"white"} as="h2">
          Get started with your assets tracking journey
        </Heading>
        <Text>
          Discover the power of precision with our cutting-edge features. From
          real-time asset tracking to secure wealth transfers, MAPP is the
          catalyst for a smarter, more organized financial journey.
        </Text>
        <Button
          colorScheme="green"
          background={colors.green_01}
          borderRadius="100px"
        >
          Get Started
        </Button>
      </Box>
      <Flex direction={"column"} w="full" align={"center"} gap={"5vh"}>
        <Heading>Get In Touch</Heading>
        <Grid templateColumns="repeat(3, 1fr)" w="100%" gap={6}>
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <Center display={"flex"} flexDirection={"column"} gap={"1vh"}>
              <Circle bgColor={"#EBFAF2"} borderRadius={"100%"} p="5px">
                <Circle
                  bgColor={"#DAF5E8"}
                  borderRadius={"100%"}
                  p="8px"
                  boxShadow={"3px"}
                >
                  <EmailIcon color={"green"} />
                </Circle>
              </Circle>

              <Text fontSize="xl" as="b">
                Email
              </Text>

              <Text color={"#828282"} textAlign={"center"}>
                Our friendly team is here to help.
              </Text>

              <Text fontSize="sm" as="b" color={colors.green_01}>
                mapp@meristemng.com
              </Text>
            </Center>
          </GridItem>

          <GridItem colSpan={{ base: 3, md: 1 }}>
            <Center display={"flex"} flexDirection={"column"} gap={"1vh"}>
              <Circle bgColor={"#EBFAF2"} borderRadius={"100%"} p="5px">
                <Circle
                  bgColor={"#DAF5E8"}
                  borderRadius={"100%"}
                  p="8px"
                  boxShadow={"3px"}
                >
                  <Icon as={IoLocationOutline} color={"green"} />
                </Circle>
              </Circle>

              <Text fontSize="xl" as="b">
                Office
              </Text>

              <Text color={"#828282"} textAlign={"center"}>
                Come say hello at our office.
              </Text>

              <Text fontSize="sm" as="b" color={colors.green_01}>
                20A Gerrard Road, Ikoyi Lagos
              </Text>
            </Center>
          </GridItem>

          <GridItem colSpan={{ base: 3, md: 1 }}>
            <Center display={"flex"} flexDirection={"column"} gap={"1vh"}>
              <Circle bgColor={"#EBFAF2"} borderRadius={"100%"} p="5px">
                <Circle
                  bgColor={"#DAF5E8"}
                  borderRadius={"100%"}
                  p="8px"
                  boxShadow={"3px"}
                >
                  <Icon as={FaWhatsapp} color={"green"} />
                </Circle>
              </Circle>

              <Text fontSize="xl" as="b">
                Phone
              </Text>

              <Text color={"#828282"} textAlign={"center"}>
                Mon-Fri from 9am to 4:30pm.
              </Text>

              <Text fontSize="sm" as="b" color={colors.green_01}>
                +234 702 5640 071
              </Text>
            </Center>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Contact;
