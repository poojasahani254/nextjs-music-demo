import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import fetcher from "../../../helper/fetcher";
import { useRouter } from "next/router";
import { usePlaylist } from "../../../helper/hooks";
import Image from "next/image";
import classes from "../../../styles/custom.module.css";

interface AddPlaylistProps {
  onClose: () => void;
  isOpen: boolean;
  song: any;
}

const AddPlaylist: FC<AddPlaylistProps> = (props) => {
  const router = useRouter();
  const cancelRef = React.useRef(null);
  const [playlistName, setPlaylistName] = useState("");
  const { playlists } = usePlaylist();
  const [list, setList] = useState([]);
  const [activeList, setActiveList] = useState();

  useEffect(() => {
    (async () => {
      const playlist = playlists && (await playlists?.clone().json());
      setList(playlist?.playlists);
    })();
  }, [playlists && !list]);

  function onChange(e: any) {
    setPlaylistName(e.target.value);
  }

  async function OnCreatePlaylist() {
    if (playlistName || activeList?.name) {
      const data = {
        name: playlistName,
        songs: [props.song],
        isUpdate: activeList,
      };

      const rsp = await fetcher("/playlist/createPlaylist", data, "POST");

      if (rsp.ok && rsp.status === 200) {
        await router.push("/playlist");
        props.onClose();
        setPlaylistName("");
        setActiveList(undefined);
      }
    }
  }

  const listItems = list?.map((v: any) => {
    return (
      <Flex
        alignItems={"center"}
        borderTop={"1px"}
        paddingY={"5px"}
        borderColor={"#cfcece"}
        key={v?.id}
        bgColor={activeList?.id === v?.id ? "#cfcece" : ""}
        onClick={() => setActiveList(v)}
      >
        <Image
          src="/playlist/musical-note.png"
          alt="playlist"
          height={40}
          width={40}
        />
        <Text marginLeft={"15px"}>{v?.name}</Text>
      </Flex>
    );
  });

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
      isOpen={props.isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Create Playlist</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Input placeholder="Playlist Name" onChange={onChange} />
          <Box
            backgroundColor={""}
            marginY={"10px"}
            className={classes.box}
            maxHeight={"200px"}
          >
            {listItems}
          </Box>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="blue" ml={3} onClick={OnCreatePlaylist}>
            Create
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddPlaylist;
