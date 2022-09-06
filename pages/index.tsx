import GradientLayout from "../components/dashboard/gradientLayout";
import {Box, Flex, Text, Image} from "@chakra-ui/react";
import prisma from '../lib/prisma'
import {FC} from "react";

const Home: FC<{ artists: any }> =({artists}) => {
  return (
      <GradientLayout
          color="gray"
      >
          <Box>
              <Box marginBottom="20px">
                  <Text fontSize="2xl" fontWeight="bold">
                      Top artist this month
                  </Text>
              </Box>
              <Flex>
                  {artists.map((artist: any) => (
                      <Box paddingX="10px" width="16%">
                          <Box bg="gray.900" borderRadius="4px" width="100%">
                              <Image
                                  src="https://placekitten.com/300/300"
                                  borderTopRadius="4px"
                              />
                              <Box padding="10px" marginTop="10px">
                                  <Text fontSize="md">{artist.name}</Text>
                                  <Text fontSize="2xs">Artist</Text>
                              </Box>
                          </Box>
                      </Box>
                  ))}
              </Flex>
          </Box>
      </GradientLayout>
  )
}

export const getServerSideProps = async () => {
    const artists = await prisma.artist.findMany({})

    return {
        props: { artists },
    }
}

export default Home
