import Image from "next/image";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
  Wrap,
  WrapItem,
  Stack,
} from "@chakra-ui/react";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

const NavMenu = [
  {
    name: "Home",
    route: "/",
    icon: MdHome,
  },
  {
    name: "Search",
    route: "/search",
    icon: MdSearch,
  },
  {
    name: "Your Library",
    route: "/library",
    icon: MdLibraryMusic,
  },
];

const PlayListMenu = [
  {
    name: "Create Playlist",
    route: "/createPlaylist",
    icon: MdPlaylistAdd,
  },
  {
    name: "Your Favorite",
    route: "/yourFavorite",
    icon: MdFavorite,
  },
];

const SideBar = () => {
  const color = "gray"
  return (
    <Box
      width={"100%"}
      height={"calc(100vh - 69px)"}
      bg={"gray.900"}
      paddingX={"5px"}
      color={"gray"}
      bgGradient={`linear(${color}.800 0%, ${color}.800 15%, ${color}.900 40%, ${color}.800 75%)`}
    >
      <Box paddingY={"20px"} height={"100%"}>
        <Box paddingX={"20px"} marginBottom={"20px"}>
          <List spacing={2}>
            {NavMenu.map((v, k) => {
              return (
                <ListItem fontSize={"16px"} paddingX={"20px"} key={v.name}>
                  <LinkBox>
                    <NextLink href={v.route} passHref>
                      <LinkOverlay>
                        <ListIcon
                          as={v.icon}
                          color="white"
                          marginRight={"20px"}
                        />
                        {v.name}
                      </LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Divider color={"gray.800"} />
        <Box paddingX={"20px"} marginTop={"20px"}>
          <List spacing={2}>
            {PlayListMenu.map((v, k) => {
              return (
                <ListItem fontSize={"16px"} paddingX={"20px"} key={v.name}>
                  <LinkBox>
                    <NextLink href={v.route} passHref>
                      <LinkOverlay>
                        <ListIcon
                          as={v.icon}
                          color="white"
                          marginRight={"20px"}
                        />
                        {v.name}
                      </LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
