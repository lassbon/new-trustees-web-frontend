import { Breadcrumb, BreadcrumbItem, Flex, Text } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { estatePlanBreadcrumbData } from "../../config/data";

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
        <Breadcrumb spacing="8px" p="5px" w="100%" overflow={"auto"}>
          {estatePlanBreadcrumbData.map((data, i) => (
            <NavLink to={path === 'simplewill' ? 'https://meristemtrustees.com/simple-will/' :  data?.link} end key={i}>
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
