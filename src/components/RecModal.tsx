import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { colors } from "../constants/colors";

type Props = {
  rec: any;
  isOpen: boolean;
  onClose: () => void;
  handleGetStarted: () => void;
};

const RecModal = ({ rec, isOpen, onClose, handleGetStarted }: Props) => {
  const paragraph = rec?.modalText?.split(".").filter((p: string) => p.trim());

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bgColor={"rgba(0, 129, 69, 0.05)"}
          fontSize={"lg"}
          fontWeight={500}
        >
          {rec?.modalHeader}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {paragraph &&
            paragraph.map((p: string) => (
              <Text mb="1rem" textIndent={"3"}>
                {p + "."}
              </Text>
            ))}
        </ModalBody>

        <ModalFooter flexDirection={"column"} gap={"3vh"}>
          <Button
            variant="solid"
            borderRadius="100px"
            colorScheme="green"
            backgroundColor={colors.green_01}
            w={"100%"}
            onClick={() => handleGetStarted()}
          >
            Get Started
          </Button>
          <Button
            variant="solid"
            bgColor="white"
            textColor={colors.green_01}
            borderRadius="100px"
            borderWidth={"0.5px"}
            borderColor={"rgba(0, 129, 69, 0.2)"}
            onClick={onClose}
            w={"100%"}
          >
            Not ready to sign up?
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RecModal;
