import {
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Divider,
  HStack,
  VStack,
} from "@chakra-ui/react";
import Logo2 from "../../assets/images/logo2.png";

const FooterLayout = () => {
  const year = new Date().getFullYear();
  return (
    <Flex
      as={"footer"}
      bgColor={"green"}
      py="20px"
      px="5vw"
      direction={"column"}
      gap={"2vh"}
      zIndex={2}
    >
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        <GridItem colSpan={{ base: 6, lg: 3 }}>
          <Flex direction={"column"} gap={"1vh"}>
            <Image src={Logo2} objectFit="contain" boxSize={"100px"} />
            <Text noOfLines={3} color={"white"}>
              Our platform is designed to simplify the complexities of wealth
              management, providing you with the tools you need.
            </Text>
          </Flex>
        </GridItem>

        <GridItem colSpan={{ base: 6, lg: 1 }}>
          <VStack align={"flex-start"}>
            <Text color={"rgba(247, 251, 249, 0.6)"} size={"sm"}>
              Address
            </Text>
            <Text color={"white"}>20A Gerrard Road, Ikoyi Lagos</Text>
            <Text color={"rgba(247, 251, 249, 0.6)"} size={"sm"} mt={"2vh"}>
              Contact
            </Text>
            <Text color={"white"}>mapp@meristemng.com</Text>
            <Text color={"white"}>+234 702 5640 071</Text>
          </VStack>
        </GridItem>

        <GridItem colSpan={{ base: 3, lg: 1 }}>
          <VStack align={"flex-start"}>
            <Text color={"rgba(247, 251, 249, 0.6)"} size={"sm"}>
              Links
            </Text>
            <Text color={"white"}>Home</Text>
            <Text color={"white"}>About</Text>
            <Text color={"white"}>Services</Text>
            <Text color={"white"}>Contact</Text>
          </VStack>
        </GridItem>

        <GridItem colSpan={{ base: 3, lg: 1 }}>
          <VStack align={"flex-start"}>
            <Text color={"rgba(247, 251, 249, 0.6)"} size={"sm"}>
              Socials
            </Text>
            <Text color={"white"}>Twitter</Text>
            <Text color={"white"}>FaceBook</Text>
            <Text color={"white"}>Instagram</Text>
          </VStack>
        </GridItem>
      </Grid>
      <Divider w="100%" />
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem colSpan={{ base: 2, lg: 1 }} color={"white"}>
          <Text size={"sm"}>@ {year} MAPP. All right reserved</Text>
        </GridItem>
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <HStack color={"white"}>
            <Text size={"sm"}>Terms </Text>
            <Text size={"sm"}>Privacy </Text>
          </HStack>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default FooterLayout;
