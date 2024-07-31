import {
  Flex,
  Wrap,
  WrapItem,
  Heading,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import About from "./About";
import Features from "./Features";
import Faq from "./Faq";
import Contact from "./Contact";

const Home = () => {
  return (
    <Flex display={"row"}>
      {/* home */}
      <Flex
        as="section"
        bgImage={"url('/images/bgImage1.png')"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        w="100%"
        h="100vh"
        objectFit="contain"
        justify="center"
        align="center"
        px="5vw"
        pt="20vh"
      >
        <Wrap w="90%" justify="space-between" spacing={3}>
          <WrapItem w={{ base: "100%", lg: "40%" }}>
            <Heading
              color={"white"}
              textTransform="uppercase"
              size="2xl"
              lineHeight={1.2}
            >
              Track, Organise and Transfer your Wealth
            </Heading>
          </WrapItem>
          <WrapItem w={{ base: "100%", lg: "40%" }}>
            <Stack h="100%" justify="space-evenly" spacing={7}>
              <Text color={"white"} w={{ base: "100%", lg: "20vw" }}>
                Seamlessly track your assets, designate beneficiaries and access
                estate planning products tailored to your needs.
              </Text>
              <Button
                colorScheme="green"
                borderRadius="100px"
                w={{ base: "40vw", lg: "10vw" }}
              >
                Get Started
              </Button>
            </Stack>
          </WrapItem>
        </Wrap>
      </Flex>
      {/* home */}

      {/* other section layout  */}
      <Flex
        px="5vw"
        py="5vh"
        as="section"
        borderTopRadius="60px"
        w="100%"
        bottom={"7vh"}
        bgColor={"white"}
        pos={"relative"}
        align={"center"}
        justify={"center"}
        direction={"column"}
        gap={"10vh"}
      >
        <About />
        <Features />
        <Faq />
        <Contact />
      </Flex>

      {/* other section layout  */}
    </Flex>
  );
};

export default Home;
