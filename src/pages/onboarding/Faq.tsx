import {
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { faqData } from "../../config/data";

const Faq = () => {
  return (
    <Flex
      as={"section"}
      id="Faq"
      direction={"column"}
      justify={"center"}
      gap={"4vh"}
      align={"center"}
    >
      <Heading textAlign={"center"}>Frequently Asked Questions</Heading>

      <Accordion allowToggle>
        {faqData.map((q, i) => (
          <AccordionItem key={i} my={"2vh"}>
            <h2>
              <AccordionButton
                bgColor={"#EBF5F0"}
                borderRadius={"6px"}
                outline={"none"}
                w="80vw"
                h="6vh"
                _expanded={{
                  borderRadius: "5px",
                  borderColor: "#008145",
                  borderWidth: "1px",
                  bgColor: "#EBF5F0",
                  color: "black",
                }}
              >
                <Box as="span" flex="1" textAlign="left">
                  {q.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel w="80vw">{q.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
};

export default Faq;
