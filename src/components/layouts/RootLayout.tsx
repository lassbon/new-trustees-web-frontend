// import MainNavigation from "./MainNavigation";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import LandingPageNavigation from "../LandingPageNavigation";
import FooterLayout from "./FooterLayout";

const RootLayout = () => {
  const handleScrollToSection = (SectionId: any) => {
    const section = document.getElementById(SectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <Flex flexDirection="column">
      <LandingPageNavigation
        onScrollToSection={(sectionId) => handleScrollToSection(sectionId)}
      />
      {/* <MainNavigation /> */}
      <Outlet />
      <FooterLayout />
    </Flex>
  );
};

export default RootLayout;
