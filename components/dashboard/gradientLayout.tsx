import { Box } from "@chakra-ui/layout";
import { Flex, Text, Image } from "@chakra-ui/react";
import { FC } from "react";

const GradientLayout: FC<any> = ({
  children,
  color,
  roundImage,
  title,
  description,
  subtitle,
  image,
}) => {
  return (
    <Box
      height="calc(100vh - 69px)"
      overflowY="auto"
      bgGradient={`linear(${color}.900 0%, ${color}.900 15%, ${color}.800 40%, ${color}.800 75%)`}
    >
      <Flex bg={`${color}.800`} padding="40px">
        <Box>
          <Image
            boxSize="160px"
            boxShadow="3xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>
        <Box paddingX="20px" color="white" height={"auto"}>
          <Text fontSize="5xl" padding={"0px"} margin={"0px"}>
            {title}
          </Text>
          <Text fontSize={"16px"}>{description}</Text>
        </Box>
      </Flex>

      {children}
    </Box>
  );
};

export default GradientLayout;
