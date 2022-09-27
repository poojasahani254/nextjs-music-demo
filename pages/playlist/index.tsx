import { validateToken } from "../../helper/auth";
import prisma from "../../helper/prisma";
import React, { FC } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import classes from "../../styles/custom.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

interface PlaylistProps {
  playLists: any[];
}

const Playlist: FC<PlaylistProps> = (props) => {
  const router = useRouter();
  const listItems = props.playLists?.map((v: any) => {
    return (
      <Flex
        alignItems={"center"}
        borderTop={"1px"}
        paddingY={"20px"}
        borderColor={"#cfcece"}
        key={v?.id}
        onClick={() => router.push(`/playlist/${v.id}`)}
      >
        <Image
          src="/playlist/musical-note.png"
          alt="playlist"
          height={80}
          width={80}
        />
        <Text marginLeft={"15px"}>{v?.name}</Text>
      </Flex>
    );
  });
  return (
    <Box
      height="calc(100vh - 69px)"
      overflowY="auto"
      bgGradient={`linear(brand.800 0%, brand.800 15%, brand.900 40%, brand.900 75%)`}
    >
      <Box bg={`brand.900`} padding="50px">
        <Heading marginBottom={"20px"} fontSize={"3xl"} color={"whitesmoke"}>
          Your Playlist
        </Heading>
        <Box
          color={"brand.50"}
          marginY={"10px"}
          className={classes.box}
          height={"calc(100vh - 240px)"}
        >
          {listItems}
        </Box>
      </Box>
    </Box>
  );
};

export const getServerSideProps = async ({ req }: any) => {
  let user, playLists;
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
    playLists = await prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
    });
  } catch (e) {
    return {
      notFound: true,
    };
  }

  return {
    props: { playLists },
  };
};

export default Playlist;
