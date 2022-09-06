import { Box } from '@chakra-ui/layout'
import {Flex} from "@chakra-ui/react";
import {FC} from "react";

const GradientLayout: FC<any> = ({ children, color }) => {
  return (
    <Box
      height="calc(100vh - 69px)"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, ${color}.900 75%)`}
    >
        {/*<Flex bg={`${color}.600`} padding="40px" align="end">*/}
        {/*    Display play content*/}
        {/*</Flex>*/}
        <Box>{children}</Box>
    </Box>
  );
};

export default GradientLayout;
