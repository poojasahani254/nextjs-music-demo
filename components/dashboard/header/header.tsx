import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Spacer,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import DrawerMenu from "./drawerMenu";
import React, { useState } from "react";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  function onCloseDrawer() {
    setOpenDrawer(false);
  }

  return (
    <React.Fragment>
      <Box width={"100%"} paddingX={"10px"}>
        <Flex p="2" alignItems={"center"} justifyContent={"center"}>
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"start"}
          >
            <IconButton
              icon={<AiOutlineMenu fontSize="30px" />}
              aria-label="play"
              colorScheme="brand.700"
              size="lg"
              onClick={() => setOpenDrawer(true)}
            />
          </Box>
          <Spacer />
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Wrap>
              <WrapItem>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </WrapItem>
            </Wrap>
          </Box>
        </Flex>
      </Box>
      <DrawerMenu isOpen={openDrawer} onClose={onCloseDrawer} />
    </React.Fragment>
  );
};

export default Header;
