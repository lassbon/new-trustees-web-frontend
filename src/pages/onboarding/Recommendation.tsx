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
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { RecommendationData, outComeData } from "../../config/data";
import RecModal from "../../components/RecModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../constants/colors";

const Recommendation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<any>(null);
  const [selectedOtp, setSelectedOtp] = useState<String>("");
  const navigate = useNavigate();

  const handleOnSelectRec = (item: any) => {
    setSelected(item);
  };
  const handleOnSelectopt = (item: any) => {
    setSelectedOtp(item.id);
  };
  const showModal = () => {
    if (selected === null) return;
    onOpen();
  };

  const handleGetStarted = () => {
    navigate("/auth/SignUp");
  };

  return (
    <Flex direction={"column"} px="5vw" pt={"18vh"} pb={"5vh"}>
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
                borderWidth={selected?.id === rec.id ? "3px" : "1px"}
                borderRadius="lg"
                borderColor={selected?.id === rec.id ? "green" : ""}
                p={"10px"}
                boxShadow="md"
                bgColor={"#EBF5F0"}
                rounded={"md"}
                gap={"2vh"}
                onClick={() => handleOnSelectRec(rec)}
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
              <Card
                size={"md"}
                bgColor={"#EBF5F0"}
                borderColor={selectedOtp === outcome.id ? "green" : ""}
                borderWidth={selectedOtp === outcome.id ? "2px" : ""}
                onClick={() => handleOnSelectopt(outcome)}
              >
                <CardBody>
                  <Text noOfLines={3}>{outcome.text}</Text>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Flex>

      <Button
        colorScheme={selected !== null && selectedOtp !== "" ? "green" : "gray"}
        backgroundColor={
          selected !== null && selectedOtp !== "" ? colors.green_01 : undefined
        }
        disabled={selected !== null && selectedOtp !== "" ? false : true}
        cursor={selected !== null && selectedOtp !== "" ? "" : "not-allowed"}
        borderRadius="100px"
        w={{ base: "40vw", lg: "10vw" }}
        alignSelf={"center"}
        onClick={showModal}
      >
        Submit
      </Button>

      <RecModal
        rec={selected}
        isOpen={isOpen}
        onClose={onClose}
        handleGetStarted={handleGetStarted}
      />
    </Flex>
  );
};

export default Recommendation;
