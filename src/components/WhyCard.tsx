import { Image } from "@chakra-ui/react";

type Props = {
  image: any;
};

const WhyCard = ({ image }: Props) => {
  return (
    <Image boxSize={{ base: "xs", lg: "sm" }} objectFit="contain" src={image} />
  );
};

export default WhyCard;
