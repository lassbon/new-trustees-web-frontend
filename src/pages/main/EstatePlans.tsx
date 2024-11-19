import {
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Text,
  Heading,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { estatePlanBreadcrumbData } from "../../config/data";
import { colors } from "../../constants/colors";

const EstatePlans = () => {
  const location = useLocation();
  const path: any = location.pathname.split("/").pop();
  const paths = [
    "educationTrust",
    "simplewill",
    "comprehensivewill",
    "nominatedfund",
  ];
  return (
    <Flex direction={"column"} gap={"4vh"} w="100%" px="2vw">
      {paths.includes(path) ? (
        <Text textTransform={"capitalize"} fontSize="3xl" fontWeight={"400"}>
          {path === "educationTrust" && "education Trust"}
          {path === "simplewill" && "simple will"}
          {path === "comprehensivewill" && "comprehensive will"}
          {path === "nominatedfund" && "nominated fund"}
        </Text>
      ) : (
        <Breadcrumb
          spacing="8px"
          // borderWidth={1}
          // borderColor={"#E6E6E6"}
          // rounded={"md"}
          p="5px"
          w="100%"
          overflow={"auto"}
        >
          {estatePlanBreadcrumbData.map((data, i) => (
            <NavLink to={data?.link} end key={i}>
              {({ isActive }) => {
                return (
                  <BreadcrumbItem
                    bgColor={isActive ? "green.100" : "transparent"}
                    rounded={"full"}
                    color={isActive ? "green." : "gray.700"}
                    p="10px"
                    flexShrink={0}
                    w={"fit-content"}
                  >
                    <Text fontSize={"medium"} fontWeight={"500"}>
                      {data.label}
                    </Text>
                  </BreadcrumbItem>
                );
              }}
            </NavLink>
          ))}
        </Breadcrumb>
      )}

      <Outlet />
    </Flex>
  );
};

export default EstatePlans;
