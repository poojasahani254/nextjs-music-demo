import { FC } from "react";
import ListSongs from "../listSongs";
import GradientLayout from "../gradientLayout";
import { Box } from "@chakra-ui/react";

interface ArtistProps {
  songs: any;
  artists: any;
}

const ArtistSongs: FC<ArtistProps> = (props) => {
  const { songs, artists } = props;
  return (
    <GradientLayout
      color={"brand"}
      roundImage={false}
      title={artists[0].name}
      subtitle="playlist"
      description={`${songs.length} songs`}
      image={artists[0].photo}
    >
      <Box bg={`brand.800`} paddingX="30px">
        <ListSongs songs={songs} />
      </Box>
    </GradientLayout>
  );
};

export default ArtistSongs;
