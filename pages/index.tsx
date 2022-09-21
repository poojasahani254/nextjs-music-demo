import { Box, Flex, Text } from "@chakra-ui/react";
import prisma from "../helper/prisma";
import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { validateToken } from "../helper/auth";
import Slider from "../components/dashboard/slider";
import classes from "../styles/custom.module.css";
import { useStoreActions } from "easy-peasy";
import Image from "next/image";

const Home: FC<{ artists: any; favSongs: any }> = ({ artists, favSongs }) => {
  const router = useRouter();
  const setFavoriteSong = useStoreActions(
    (state: any) => state.changeFavoriteSongs
  );

  useEffect(() => {
    setFavoriteSong(favSongs);
  }, [favSongs]);

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
      // p={{sm: "0px"}}
      className={classes.box}
    >
      <Slider />
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
              <Image
                src={artist.photo || "https://placekitten.com/300/300"}
                height={300}
                width={300}
              />
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
  let user, artists, favSongs;
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

  try {
    artists = await prisma.artist.findMany({});
    favSongs = await prisma.favorite.findMany({});
  } catch (e) {
    return {
      notFound: true,
    };
  }

  return {
    props: { artists, favSongs },
  };
};

export default Home;
