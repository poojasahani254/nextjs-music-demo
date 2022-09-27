import { validateToken } from "../helper/auth";
import prisma from "../helper/prisma";
import React, { FC } from "react";
import { Box, Heading } from "@chakra-ui/react";
import ListSongs from "../components/dashboard/listSongs";

interface FavoriteSongsProps {
  favSongsList: any[];
}

const FavoriteSongs: FC<FavoriteSongsProps> = (props) => {
  return (
    <Box
      height="calc(100vh - 69px)"
      overflowY="auto"
      bgGradient={`linear(brand.800 0%, brand.800 15%, brand.900 40%, brand.900 75%)`}
    >
      <Box bg={`brand.900`} padding="30px">
        <Heading marginBottom={"20px"} fontSize={"3xl"} color={"whitesmoke"}>
          Your Favorites
        </Heading>
        <ListSongs songs={props.favSongsList} />
      </Box>
    </Box>
  );
};

export const getServerSideProps = async ({ req }: any) => {
  let user, favSongsList;
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
    const favSongs = await prisma.favorite.findMany({});
    const songIds: number[] = favSongs.map((v) => Number(v.songId));
    favSongsList = await prisma.songs.findMany({
      where: {
        id: { in: songIds },
      },
    });
  } catch (e) {
    return {
      notFound: true,
    };
  }

  return {
    props: { favSongsList },
  };
};

export default FavoriteSongs;
