import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { FC } from "react";
import NextLink from "next/link";
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavMenu = [
  {
    name: "Home",
    route: "/",
    icon: MdHome,
  },
  // {
  //   name: "Search",
  //   route: "/search",
  //   icon: MdSearch,
  // },
  // {
  //   name: "Your Library",
  //   route: "/library",
  //   icon: MdLibraryMusic,
  // },
];

const PlayListMenu = [
  {
    name: "Your Playlist",
    route: "/playlist",
    icon: MdPlaylistAdd,
  },
  {
    name: "Your Favorite",
    route: "/favoriteSongs",
    icon: MdFavorite,
  },
];

const DrawerMenu: FC<DrawerMenuProps> = ({ onClose, isOpen }) => {
  return (
    <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />

      <DrawerContent bgColor={"brand.900"} color={"brand.50"}>
        <DrawerCloseButton marginBottom={"20px"} />
        <DrawerHeader />
        <DrawerBody p={"0"} marginTop={"20px"}>
          <Box height={"100%"}>
            <Box paddingX={"27px"} marginBottom={"20px"}>
              <List spacing={2}>
                {NavMenu.map((v, k) => {
                  return (
                    <ListItem fontSize={"16px"} key={v.name}>
                      <LinkBox>
                        <NextLink href={v.route} passHref>
                          <LinkOverlay>
                            <ListIcon
                              as={v.icon}
                              color="white"
                              fontSize={"20px"}
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
            <Box paddingX={"27px"} marginTop={"20px"}>
              <List spacing={2}>
                {PlayListMenu.map((v, k) => {
                  return (
                    <ListItem fontSize={"16px"} key={v.name}>
                      <LinkBox>
                        <NextLink href={v.route} passHref>
                          <LinkOverlay>
                            <ListIcon
                              as={v.icon}
                              color="white"
                              marginRight={"20px"}
                              fontSize={"20px"}
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
