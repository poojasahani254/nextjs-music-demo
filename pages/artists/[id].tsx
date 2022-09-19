import ArtistSongs from "../../components/dashboard/artists/artist";
import { validateToken } from "../../helper/auth";
import prisma from "../../helper/prisma";

const ArtistsSongs = ({ songs, artists }: any) => {
  return <ArtistSongs songs={songs} artists={artists} />;
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

  const songs = await prisma.songs.findMany({
    where: {
      artistId: +query.id,
    },
  });

  const artists = await prisma.artist.findMany({
    where: {
      id: +query.id,
    },
  });

  return {
    props: { songs, artists },
  };
};
export default ArtistsSongs;
