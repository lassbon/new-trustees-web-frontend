import { Card, Stack, Heading, Text, CardFooter, Img } from "@chakra-ui/react";

type Props = {
  img: any;
  header: string;
  text: string;
};
const FeatureCard = ({ img, header, text }: Props) => {
  return (
    <Card
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      borderRadius={"20px"}
      bgColor={"#EBF5F0"}
    >
      <Img
        objectFit="cover"
        maxW={{ base: "100%", md: "200px" }}
        maxH={{ base: "200px" }}
        src={img}
        alt="img"
      />

      <Stack maxW={{ xl: "25vw" }}>
        <CardFooter h="100%" justify={"end"} flexDirection={"column"}>
          <Heading size="md">{header}</Heading>
          <Text py="2">{text}</Text>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default FeatureCard;
