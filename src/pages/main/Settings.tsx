import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import PersonalInfo from "./SettingsTabs/PersonalInfo";
import Security from "./SettingsTabs/Security";
import NextOfKin from "./SettingsTabs/NextOfKin";
import VerifyIdentity from "./SettingsTabs/VerifyIdentity";

const Settings = () => {
  return (
    <Flex direction={"column"} gap={"3vh"} w="100%" px="2vw">
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList w="full" overflow={"auto"}>
          <Tab flexShrink={0} minW={"auto"}>
            Personal Infomation
          </Tab>
          <Tab flexShrink={0} minW={"auto"}>
            Security
          </Tab>
          <Tab flexShrink={0} minW={"auto"}>
            Next of Kin
          </Tab>
          <Tab>Verify Identity</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <PersonalInfo />
          </TabPanel>
          <TabPanel px={0}>
            <Security />
          </TabPanel>
          <TabPanel px={0}>
            <NextOfKin />
          </TabPanel>
          <TabPanel px={0}>
            <VerifyIdentity />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Settings;
