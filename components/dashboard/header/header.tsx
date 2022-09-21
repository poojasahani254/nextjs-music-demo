import {
  Avatar,
  Box,
  Flex,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Wrap,
  WrapItem,
  Text,
} from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import DrawerMenu from "./drawerMenu";
import React, { useState } from "react";
import fetcher from "../../../helper/fetcher";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const CurrentUserHoc = dynamic(() => import("../../common/currentUserHoc"), {
  suspense: true,
});

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const [userData, setUser] = useState();

  function onCloseDrawer() {
    setOpenDrawer(false);
  }

  async function logoutHandler() {
    const rsp = await fetcher("/user/logout", {}, "POST");
    if (rsp.ok && rsp.status === 200) {
      await router.push("/signIn");
    }
  }

  return (
    <CurrentUserHoc setUser={setUser}>
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
              color={"white"}
            >
              <Text marginRight={"10px"}>Welcome, {userData?.firstName}</Text>
              <Popover placement="bottom" closeOnBlur={true}>
                <PopoverTrigger>
                  <Wrap>
                    <WrapItem>
                      <Avatar
                        name={userData?.firstName + " " + userData?.lastName}
                      />
                    </WrapItem>
                  </Wrap>
                </PopoverTrigger>
                <PopoverContent
                  color="white"
                  bg="brand.600"
                  width={"200px"}
                  justifyContent={"center"}
                  borderColor="brand.900"
                >
                  <PopoverArrow />
                  <PopoverBody>
                    <List spacing={4}>
                      <ListItem
                        cursor={"pointer"}
                        onClick={() => router.push("/edit-profile")}
                      >
                        <ListIcon as={AiOutlineUser} color="brand.50" />
                        Profile
                      </ListItem>
                      <ListItem
                        onClick={() => logoutHandler()}
                        cursor={"pointer"}
                      >
                        <ListIcon as={AiOutlineLogout} color="brand.50" />
                        Logout
                      </ListItem>
                    </List>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </Flex>
        </Box>
        <DrawerMenu isOpen={openDrawer} onClose={onCloseDrawer} />
      </React.Fragment>
    </CurrentUserHoc>
  );
};

export default Header;
