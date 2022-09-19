import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import RightSidePanel from "./RightSidePanel";
import Header from "../dashboard/header/header";
import PlayerBar from "../dashboard/playerbar";
import { useStoreState } from "easy-peasy";
import { useSelector } from "react-redux";

const PlayerLayout = ({ children }: { children: ReactNode }) => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useSelector((state: any) => state.activeSong);

  return (
    <Box width={"100%"} height={"100vh"}>
      <Box
        left={"0"}
        top={"0"}
        height={"8%"}
        width={"100%"}
        position={"absolute"}
        bgColor={"brand.600"}
      >
        <Header />
      </Box>
      <Flex
        width={"100%"}
        left={"0"}
        top={"8%"}
        position={"absolute"}
        display={{md: "flex"}}
        direction={{ base: 'row', md: 'column', lg:"row", sm: "column"}}
      >
        <Box width={["100%", "100%", "100%", "80%"]} flexShrink={0}>
          {children}
        </Box>
        <Box width={["100%", "100%", "100%", "20%"]}>
          <RightSidePanel />
        </Box>
      </Flex>
      {activeSong ? (
        <Box
          bgColor={"brand.600"}
          left={"0"}
          bottom={"0"}
          position={"absolute"}
          width={"100%"}
        >
          <PlayerBar songs={songs} activeSong={activeSong} />
        </Box>
      ) : null}
    </Box>
  );
};

export default PlayerLayout;
