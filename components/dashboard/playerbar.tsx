import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreActions, useStoreState } from "easy-peasy";
import ReactHowler from "react-howler";
import React, { FC, useEffect, useRef, useState } from "react";
import { formatTime } from "../../helper/formatters";
import {
  Avatar,
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack, useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
  MdVolumeUp,
  MdVolumeOff,
  MdFavorite,
  MdPlaylistAdd,
} from "react-icons/md";
import fetcher from "../../helper/fetcher";
import AddPlaylist from "./playlist/addPlaylist";

const PlayerBar: FC<{ songs: any; activeSong: any }> = ({
  songs,
  activeSong,
}) => {

  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);
  const setFavoriteSong = useStoreActions(
    (state: any) => state.changeFavoriteSongs
  );

  const favoriteSongs = useStoreState((state: any) => state.favoriteSongs);
  let favoriteManage = !!favoriteSongs.find(
    (value: any) => value.songId === activeSong.id
  );

  const [playing, setPlaying] = useState(true);
  const [seek, setSeek] = useState(0.0);
  const [volume, setVolume] = useState(0.7);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [favorite, setFavorite] = useState(favoriteManage);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);
  const { isOpen, onOpen, onClose } = useDisclosure()


  const [index, setIndex] = useState(
    songs.findIndex((s: any) => s.id === activeSong.id)
  );

  useEffect(() => {
    setFavorite(favoriteManage);
  }, [favoriteManage]);

  useEffect(() => {
    let timerId: any = null;

    if (playing && !isSeeking) {
      const playSongs = () => {
        if (soundRef.current) {
          setSeek((soundRef.current as any).seek());
        }
        timerId = requestAnimationFrame(playSongs);
      };

      timerId = requestAnimationFrame(playSongs);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (value: any) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  const prevSong = () => {
    setIndex((state: any) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state: any) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return nextSong();
        }
        return next;
      }

      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onSeek = (e: any) => {
    setSeek(parseFloat(e[0]));
    (soundRef.current as any).seek(e[0]);
  };

  const onVolume = (e: any) => {
    setVolume(parseFloat(e[0]));
    (soundRef.current as any).volume(e[0]);
  };

  const onLoad = () => {
    if (soundRef.current) {
      const songDuration = (soundRef.current as any).duration();
      setDuration(songDuration);
    }
  };

  const onEnd = () => {
    if (repeatRef.current && soundRef.current) {
      setSeek(0);
      (soundRef.current as any).seek(0);
    } else {
      nextSong();
    }
  };

  const onFavorite = async () => {
    let exists = favoriteSongs.find(
      (value: any) => value.songId === activeSong.id
    );

    if (!exists) {
      const rsp = await fetcher(
        "/favorite/create",
        {
          songId: activeSong.id,
        },
        "POST"
      );

      let jsonResponse = await rsp.json();

      if (rsp.ok && rsp.status === 200) {
        setFavoriteSong([jsonResponse.favSong]);
      }
      setFavorite((state: any) => !state);
    }
  };

  return (
      <React.Fragment>
        <Box height="70px" width="100vw" bg="brand.600" color="brand.50">
          <Box>
            <ReactHowler
                playing={playing}
                src={activeSong?.url}
                ref={soundRef}
                onLoad={onLoad}
                onEnd={onEnd}
            />
          </Box>
          <Box>
            <RangeSlider
                position={"absolute !important"}
                paddingTop={"0px !important"}
                paddingBottom={"0px !important"}
                aria-label={["min", "max"]}
                step={0.1}
                width={"calc(100vw - 10px)"}
                min={0}
                id="player-range"
                max={duration ? (duration.toFixed(2) as unknown as number) : 0}
                onChange={onSeek}
                value={[seek]}
                onChangeStart={() => setIsSeeking(true)}
                onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="brand.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>

          <Flex height={"100%"}>
            <Flex direction={"row"} color="white" width="30%">
              <Flex width={"80%"} align={"center"} padding={"20px"}>
                <Wrap>
                  <WrapItem>
                    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                  </WrapItem>
                </Wrap>
                <Box
                    paddingLeft={"10px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                  <Text fontSize="1xl">{activeSong?.artist?.name}</Text>
                  <Text fontSize="2xs">{activeSong?.name}</Text>
                </Box>
              </Flex>
              <Flex width={"20%"} alignItems={"center"} justifyContent={"end"}>
                <Text fontSize="xs">
                  {formatTime(seek)} - {formatTime(duration)}
                </Text>
              </Flex>
            </Flex>
            <Flex width={"100%"} align={"center"}>
              <Flex
                  color="brand.50"
                  width="100%"
                  justifyContent={"center"}
                  alignItems={"center"}
              >
                <ButtonGroup
                    width={"50%"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                >
                  <IconButton
                      outline="none"
                      variant="link"
                      aria-label="shuffle"
                      fontSize="24px"
                      color={shuffle ? "white" : "gray.600"}
                      onClick={onShuffle}
                      icon={<MdShuffle />}
                  />
                  <IconButton
                      outline="none"
                      variant="link"
                      aria-label="skip"
                      fontSize="24px"
                      icon={<MdSkipPrevious />}
                      onClick={prevSong}
                  />
                  {playing ? (
                      <IconButton
                          outline="none"
                          variant="link"
                          aria-label="pause"
                          fontSize="40px"
                          color="white"
                          icon={<MdOutlinePauseCircleFilled />}
                          onClick={() => setPlayState(false)}
                      />
                  ) : (
                      <IconButton
                          outline="none"
                          variant="link"
                          aria-label="play"
                          fontSize="40px"
                          color="white"
                          icon={<MdOutlinePlayCircleFilled />}
                          onClick={() => setPlayState(true)}
                      />
                  )}

                  <IconButton
                      outline="none"
                      variant="link"
                      aria-label="next"
                      fontSize="24px"
                      icon={<MdSkipNext />}
                      onClick={nextSong}
                  />
                  <IconButton
                      outline="none"
                      variant="link"
                      aria-label="repeat"
                      fontSize="24px"
                      color={repeat ? "white" : "gray.600"}
                      onClick={onRepeat}
                      icon={<MdOutlineRepeat />}
                  />
                </ButtonGroup>
                <Flex width={"50%"} alignItems={"center"}>
                  <Flex
                      width={"40%"}
                      alignItems={"center"}
                      justifyContent={"center"}
                  >
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="shuffle"
                        fontSize="24px"
                        color={"gray.600"}
                        onClick={() => onVolume([0])}
                        icon={volume === 0 ? <MdVolumeOff /> : <MdVolumeUp />}
                    />
                    <RangeSlider
                        marginLeft={"5px"}
                        aria-label={["min", "max"]}
                        step={0.1}
                        width={"100px"}
                        min={0}
                        id="player-range"
                        max={1}
                        onChange={onVolume}
                        value={[volume]}
                        onChangeStart={() => setIsSeeking(true)}
                        onChangeEnd={() => setIsSeeking(false)}
                    >
                      <RangeSliderTrack bg="brand.800">
                        <RangeSliderFilledTrack bg="gray.600" />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                    </RangeSlider>
                  </Flex>
                  <Flex marginLeft={"5rem"} alignItems={"center"} width={"60%"}>
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="shuffle"
                        fontSize="28px"
                        color={favorite ? "red.600" : "gray.600"}
                        onClick={onFavorite}
                        icon={<MdFavorite />}
                    />
                    <IconButton
                        marginLeft={"1rem"}
                        outline="none"
                        variant="link"
                        aria-label="shuffle"
                        fontSize="28px"
                        onClick={onOpen}
                        icon={<MdPlaylistAdd />}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <AddPlaylist
          onClose={onClose}
          isOpen={isOpen}
          song={activeSong}
        />
      </React.Fragment>
  );
};

export default PlayerBar;
