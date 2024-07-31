import { Box, Flex, Heading, Stack, Text, Image } from "@chakra-ui/react";
import image1 from "../../assets/images/spImage1.png";
import image2 from "../../assets/images/spImage2.png";

const About = () => {
  return (
    <Flex as={"section"} id="About" justify={"space-between"} gap={"5vw"}>
      <Stack direction={{ base: "column", xl: "row" }} spacing={"4vw"}>
        <Image
          objectFit="contain"
          src={image1}
          alt="image"
          boxSize={"md"}
          hideBelow={"xl"}
        />
        <Box>
          <Heading>
            MAPP is a great way to Track, Organise and Transfer your Wealth
          </Heading>
          <Text my={"3vh"}>
            Mapp is designed to simplify the complexities of wealth management
            and wealth transfer, providing you with the tools needed to
            organize, track and transfer your assets effortslessly.
          </Text>
          <Stack
            direction={{ base: "column", lg: "row" }}
            spacing={"40px"}
            align={"center"}
          >
            <Text as={"h1"} hideBelow={"lg"} lineHeight={2}>
              At MAPP, we understand the importance of safeguarding your assets
              and protecting your loved ones, so we empower individuals to take
              control of their financial future via a range of estate planning
              products tailored to their specific needs. From adding your assets
              for seamless tracking to designating intended beneficiaries of
              those assets, MAPP ensures your assets are passed on to the right
              people providing you with the peace of mind you deserve.
            </Text>
            <Image
              objectFit="cover"
              src={image2}
              alt="image"
              boxSize={{ base: "sm", md: "xl", lg: "250px" }}
              borderRadius={"2xl"}
            />
            <Text hideFrom={"lg"}>
              At MAPP, we understand the importance of safeguarding your assets
              and protecting your loved ones, so we empower individuals to take
              control of their financial future via a range of estate planning
              products tailored to their specific needs. From adding your assets
              for seamless tracking to designating intended beneficiaries of
              those assets, MAPP ensures your assets are passed on to the right
              people providing you with the peace of mind you deserve.
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default About;
