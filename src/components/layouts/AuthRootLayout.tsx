import { Flex, Image } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

import { useNavigate } from "react-router-dom";

const AuthRootLayout = () => {
  const navigate = useNavigate();

  return (
    <Flex
      flexDirection="column"
      h="100vh"
      justify={"center"}
      align={"end"}
      px="5vw"
      bgImage={"url('/images/bgImage3.png')"}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Flex
        py="20px"
        px={"5vw"}
        as={"nav"}
        position="absolute"
        w="100%"
        left={0}
        top={0}
      >
        <Image
          boxSize="100px"
          objectFit="contain"
          src={Logo}
          alt="Dan Abramov"
          onClick={() => navigate("/")}
          cursor={"pointer"}
        />
      </Flex>
      <Outlet />
    </Flex>
  );
};

export default AuthRootLayout;
