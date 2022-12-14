import { ReactNode, Suspense } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("../dashboard/header/header"), {
  suspense: true,
});

const RightSidePanel = dynamic(() => import("./RightSidePanel"), {
  suspense: true,
});

const PlayerBar = dynamic(() => import("../dashboard/playerbar"));

const PlayerLayout = ({ children }: { children: ReactNode }) => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useSelector((state: any) => state.activeSong);

  return (
    <Suspense fallback={`Loading...`}>
      <Box width={"100%"} height={"100vh"}>
        <Box
          left={"0"}
          top={"0"}
          height={"8%"}
          width={"100%"}
          position={"absolute"}
          bgColor={"brand.600"}
        >
          <DynamicHeader />
        </Box>
        <Flex
          width={"100%"}
          left={"0"}
          top={"8%"}
          position={"absolute"}
          display={{ md: "flex" }}
          direction={{ base: "row", md: "column", lg: "row", sm: "column" }}
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
    </Suspense>
  );
};

export default PlayerLayout;
