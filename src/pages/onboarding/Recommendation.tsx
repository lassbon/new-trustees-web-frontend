import {
  Center,
  Flex,
  Heading,
  Text,
  Grid,
  GridItem,
  Box,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { RecommendationData, outComeData } from "../../config/data";

const Recommendation = () => {
  return (
    <Flex direction={"column"} px="5vw" pt={"18vh"}>
      <Center flexDirection={"column"} gap={"2vh"}>
        <Heading textTransform={"uppercase"}>Recommendation</Heading>
        <Text maxWidth={{ base: "80vw", lg: "476px" }} textAlign={"center"}>
          Where do you want all your Assets to go? Find out what is suitable for
          you when it comes to your assets and your wishes.
        </Text>
      </Center>

      <Flex direction={"column"} gap={"3vh"} py={"5vh"}>
        <Heading size={{ base: "sm", lg: "md" }}>
          A. What’s your status?
        </Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap={"2vh"}>
          {RecommendationData.map((rec, i) => (
            <GridItem colSpan={{ base: 4, md: 2, lg: 1 }} key={i}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                h={{ base: "22vh", lg: "22vh" }}
                borderWidth="1px"
                borderRadius="lg"
                p={"10px"}
                boxShadow="md"
                bgColor={"#EBF5F0"}
                rounded={"md"}
                gap={"2vh"}
              >
                <Heading size={"sm"}>{rec.header}</Heading>
                <Text size={"xs"} noOfLines={4}>
                  {rec.text}
                </Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Flex>

      <Flex direction={"column"} gap={"3vh"} py={"5vh"}>
        <Heading size={{ base: "sm", lg: "md" }}>
          B. What do you think would be the outcome if you pass on without
          planning your Estate?
        </Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap={"2vh"}>
          {outComeData.map((outcome, i) => (
            <GridItem colSpan={{ base: 4, md: 2, lg: 1 }} key={i}>
              <Card size={"md"} bgColor={"#EBF5F0"}>
                <CardBody>
                  <Text noOfLines={3}>{outcome.text}</Text>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Recommendation;
