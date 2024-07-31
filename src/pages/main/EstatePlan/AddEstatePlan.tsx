import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import CommonCard from "../../../components/commonCard";
import { commonCardData, estatePlanningData } from "../../../config/data";

const AddEstatePlan = () => {
  return (
    <Flex direction={"column"} gap={"4vh"} w="100%">
      <Flex direction={"column"} gap={"2vh"} as={"section"}>
        <Heading size={"md"}>Recommendations</Heading>
        <Flex
          w="full"
          overflow={"auto"}
          gap={"3vw"}
          justify={"space-evenly"}
          scrollBehavior={"smooth"}
          sx={{
            "::-webkit-scrollbar": {
              width: "1vh",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#E6E6E6",
              marginTop: "10px",
            },
          }}
        >
          {commonCardData.map((data, i) => (
            <CommonCard {...data} key={i} />
          ))}
        </Flex>
      </Flex>
      <Flex direction={"column"} gap={"2vh"} as={"section"}>
        <Heading size={"md"}>
          Estate Planning Tools to Protect your loved ones
        </Heading>
        <Grid templateColumns="repeat(6, 1fr)" w="100%" h="100%" gap={3}>
          {estatePlanningData.map((data, i) => (
            <GridItem colSpan={{ base: 6, lg: 3 }} key={i}>
              <CommonCard {...data} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default AddEstatePlan;
