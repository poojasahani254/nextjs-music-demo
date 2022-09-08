import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import prisma from "../lib/prisma";
import { FC } from "react";
import { useRouter } from "next/router";
import { validateToken } from "../lib/auth";

const Home: FC<{ artists: any }> = ({ artists }) => {
  const router = useRouter();

  function onArtistClick(artist: any) {
    router.push(`/artists/${artist.id}`);
  }

  return (
    <Box
      height="calc(100vh - 69px)"
      bgColor={"brand.900"}
      overflowY="auto"
      color={"brand.50"}
      paddingY={"15px"}
      paddingX={"35px"}
    >
      <Box marginBottom="20px">
        <Text fontSize="2xl" fontWeight="bold">
          Top Artist Songs
        </Text>
      </Box>
      <Flex>
        {artists.map((artist: any) => (
          <Box
            paddingX="10px"
            width="16%"
            key={artist.name}
            cursor={"pointer"}
            _hover={{ transform: "scale(1.1)" }}
            onClick={() => onArtistClick(artist)}
          >
            <Box bg="brand.900" borderRadius="5px" width="100%">
              <Image src="https://placekitten.com/300/300" borderRadius="5px" />
              <Box marginTop={"2px"} color={"white"}>
                <Text fontSize="16px">{artist.name}</Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export const getServerSideProps = async ({ req }: any) => {
  let user;
  try {
    user = validateToken(req.cookies.DEMO_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signIn",
      },
    };
  }

  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
