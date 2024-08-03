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
      {paths.includes(path) ? null : (
        <Breadcrumb
          spacing="8px"
          borderWidth={1}
          borderColor={"#E6E6E6"}
          rounded={"md"}
          p="5px"
        >
          {estatePlanBreadcrumbData.map((data, i) => (
            <NavLink to={data?.link} end key={i}>
              {({ isActive }) => {
                return (
                  <BreadcrumbItem
                    bgColor={isActive ? "green" : "transparent"}
                    rounded={"lg"}
                    color={isActive ? "white" : "black"}
                    p="10px"
                  >
                    <Text>{data.label}</Text>
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
