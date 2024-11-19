import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { colors } from "../constants/colors";
type Props = {
  bgImage?: any;
  text?: string;
  header: string;
  onclick?: () => void;
};
const CommonCard = ({ bgImage, text, header, onclick }: Props) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
      bgImage={`url(${bgImage})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      width={"100%"}
      h={{ lg: "40vh" }}
      p={"20px"}
      filter="auto"
      rounded={"xl"}
      gap={"1vh"}
    >
      <Heading color={"white"} size={{ base: "sm", lg: "md" }}>
        {header}
      </Heading>
      <Text
        color={"white"}
        width={{ base: "80vw", lg: "30vw" }}
        fontSize={"15px"}
        noOfLines={3}
      >
        {text}
      </Text>
      <Button
        colorScheme="green"
        variant="ghost"
        color={colors.green_01}
        rightIcon={<ArrowForwardIcon />}
        justifyContent={"flex-start"}
        width={"50%"}
        size={"md"}
        onClick={() => {
          if (onclick) onclick();
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default CommonCard;
