import { Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { featuresData, whyData } from "../../config/data";
import FeatureCard from "../../components/FeatureCard";
import WhyCard from "../../components/WhyCard";

const Features = () => {
  return (
    <Flex direction={"column"} gap={"10vh"}>
      {/* features section */}
      <Flex
        as={"section"}
        id="Services"
        direction={"column"}
        gap={"5vh"}
        align={"center"}
      >
        <Heading>Key Features</Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={9}>
          {featuresData.map((feat, i) => (
            <GridItem key={i} colSpan={{ base: 2, lg: 1 }}>
              <FeatureCard {...feat} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
      {/* features section */}
      <Flex direction={"column"} gap={"4vh"}>
        <Grid templateColumns="repeat(2, 1fr)" gap={"2vh"}>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Heading>Why Choose MAPP</Heading>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Text>
              Discover the power of precision with our cutting-edge features.
              From real-time asset tracking to secure wealth transfers, MAPP is
              the catalyst for a smarter, more organized financial journey
            </Text>
          </GridItem>
        </Grid>
        <Flex w="full" overflow={"auto"} gap={"3vw"} justify={"space-evenly"}>
          {whyData.map((why, i) => (
            <WhyCard image={why?.img} key={i} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Features;
