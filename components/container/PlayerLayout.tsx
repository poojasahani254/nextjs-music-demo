import { ReactNode } from "react";
import {Avatar, Box, Flex, Stack, useColorModeValue, Wrap, WrapItem} from "@chakra-ui/react";
import SideBar from "./SideBar";

const PlayerLayout = ({ children }: { children: ReactNode }) => {
  const color = "gray";
  return (
    <Box width={"100%"} height={"100vh"}>
      <Box
        bgGradient={`linear(${color}.800 0%, ${color}.800 15%, ${color}.800 40%, ${color}.800 75%)`}
        left={"0"}
        top={"0"}
        height={"8%"}
        width={"100%"}
        position={"absolute"}
      >
          <Box display={"end"} width={"100%"} paddingX={"20px"} marginBottom={"20px"}>
              <Stack
                  align={"end"}
                  justify={"space-between"}
                  direction={{ base: "column", sm: "row" }}
              >
                  <Wrap>
                      <WrapItem>
                          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                      </WrapItem>
                  </Wrap>
              </Stack>
          </Box>
      </Box>
      <Flex width={"100%"} left={"0"} top={"8%"} position={"absolute"}>
        <Box width={"85%"}>{children}</Box>
          <Box width={"15%"}>
              <SideBar />
          </Box>
      </Flex>
      {/*<Box*/}
      {/*  bg={useColorModeValue("gray.700", "gray.900")}*/}
      {/*  left={"0"}*/}
      {/*  bottom={"0"}*/}
      {/*  position={"absolute"}*/}
      {/*  height={"8%"}*/}
      {/*  width={"100%"}*/}
      {/*>*/}
      {/*  Bottom*/}
      {/*</Box>*/}
    </Box>
  );
};

export default PlayerLayout;
