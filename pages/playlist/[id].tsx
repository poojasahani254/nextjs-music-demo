import { validateToken } from "../../helper/auth";
import prisma from "../../helper/prisma";
import GradientLayout from "../../components/dashboard/gradientLayout";
import ListSongs from "../../components/dashboard/listSongs";
import { Box } from "@chakra-ui/react";

const Playlist = ({ playlist }: any) => {
  return (
    <GradientLayout
      color={"brand"}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <Box bg={`brand.800`} paddingX="30px">
        <ListSongs songs={playlist.songs} />
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }: any) => {
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

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: 1,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};
export default Playlist;
