import { Box } from "@chakra-ui/react";
import Ads from "../dashboard/ads/ads";

const RightSidePanel = () => {
  return (
    <Box
      width={"100%"}
      height={"calc(100vh - 69px)"}
      bg={"brand.800"}
      paddingX={"5px"}
      color={"whiteAlpha.900"}
    >
        <Ads path={"googleAds"}/>
    </Box>
  );
};

export default RightSidePanel;
