import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import fetcher from "../../helper/fetcher";
import { useRouter } from "next/router";

interface EditProfileProps {
  user: any;
}

const EditProfileScreen: FC<EditProfileProps> = (props) => {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    country: "",
    state: "",
    contactNumber: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  function onChange(e: any) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function onEdit() {
    if (user) {
      const rsp = await fetcher(
        "/user/edit-profile",
        {
          user,
        },
        "POST"
      );

      if (rsp.ok && rsp.status === 200) {
        await router.push("/");
      }
    }
  }

  return (
    <Box
      bg={useColorModeValue("brand.900", " brand.900")}
      boxShadow={"lg"}
      p={8}
      height={"calc(100vh - 69px)"}
    >
      <Box width={"35%"} py={4} ml={20}>
        <Stack mx={"auto"}>
          <Stack>
            <Heading fontSize={"3xl"} color={"whitesmoke"}>
              Edit Profile
            </Heading>
          </Stack>
        </Stack>
        <Stack
          spacing={4}
          color={"brand.50"}
          direction={{ base: "column", sm: "row" }}
          marginTop={"1.5rem"}
        >
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input
              borderRadius={5}
              name="firstName"
              onChange={onChange}
              value={user?.firstName || ""}
            />
          </FormControl>
          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input
              borderRadius={5}
              name="lastName"
              onChange={onChange}
              value={user?.lastName || ""}
            />
          </FormControl>
        </Stack>
        <Stack spacing={4} marginTop={"1.5rem"} color={"brand.50"}>
          <FormControl id="email">
            <FormLabel>Email Address</FormLabel>
            <Input
              value={user?.email || ""}
              borderRadius={5}
              name="email"
              type={"email"}
              disabled={true}
              onChange={onChange}
            />
          </FormControl>
        </Stack>
        <Stack spacing={4} marginTop={"1.5rem"} color={"brand.50"}>
          <FormControl id="contactNumber">
            <FormLabel>Contact Number</FormLabel>
            <Input
              borderRadius={5}
              name="contactNumber"
              onChange={onChange}
              value={user?.contactNumber || ""}
            />
          </FormControl>
        </Stack>
        <Stack spacing={4} marginTop={"1.5rem"} color={"brand.50"}>
          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Input
              borderRadius={5}
              name="address"
              onChange={onChange}
              value={user?.address || ""}
            />
          </FormControl>
        </Stack>
        <Stack
          spacing={4}
          color={"brand.50"}
          direction={{ base: "column", sm: "row" }}
          marginTop={"1.5rem"}
        >
          <FormControl id="city">
            <FormLabel>City</FormLabel>
            <Input
              borderRadius={5}
              name="city"
              onChange={onChange}
              value={user?.city || ""}
            />
          </FormControl>
          <FormControl id="state">
            <FormLabel>State</FormLabel>
            <Input
              borderRadius={5}
              name="state"
              onChange={onChange}
              value={user?.state || ""}
            />
          </FormControl>
        </Stack>
        <Stack
          spacing={4}
          color={"brand.50"}
          direction={{ base: "column", sm: "row" }}
          marginTop={"1.5rem"}
        >
          <FormControl id="zipCode">
            <FormLabel>Zip Code</FormLabel>
            <Input
              borderRadius={5}
              name="zipCode"
              onChange={onChange}
              value={user?.zipCode || ""}
            />
          </FormControl>
          <FormControl id="country">
            <FormLabel>Country</FormLabel>
            <Input
              borderRadius={5}
              name="country"
              onChange={onChange}
              value={user?.country || ""}
            />
          </FormControl>
        </Stack>
        <Stack
          spacing={4}
          color={"brand.50"}
          direction={{ base: "column", sm: "row" }}
          marginTop={"1.5rem"}
        >
          <Button colorScheme="blue" onClick={onEdit}>
            UPDATE
          </Button>
          <Button colorScheme="red" onClick={() => router.push("/")}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default EditProfileScreen;
