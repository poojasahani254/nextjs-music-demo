import React, { FC, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import fetcher from "../../../lib/fetcher";
import { useRouter } from "next/router";

interface ResetPasswordProps {
  email: string;
}

const ResetPassword: FC<ResetPasswordProps> = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  async function UpdatePassword() {
    if (props.email) {
      const rsp = await fetcher(
        "/user/reset-password/recover-password",
        {
          email: props.email,
          password: newPassword,
        },
        "POST"
      );
      let rspData = await rsp.json();

      if (rsp.ok && rsp.status === 200) {
        await router.push("/signIn");
      }
    }
  }

  return (
    <React.Fragment>
      <Stack>
        <Heading fontSize={"3xl"} color={"whitesmoke"}>
          Reset Password
        </Heading>
        <Text fontSize={"sm"} color={"gray.50"}>
          Please enter a new password for musicHigh Account
        </Text>
      </Stack>
      <Stack spacing={4} marginTop={8} color={"brand.50"}>
        <FormControl id="newPassword" marginBottom={5}>
          <FormLabel>New Password</FormLabel>
          <Input
            borderRadius={5}
            name="newPassword"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id="confirmPassword" marginBottom={10}>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            borderRadius={5}
            name="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button
          onClick={UpdatePassword}
          bg={"blue.400"}
          color={"gray.50"}
          disabled={
            !!newPassword &&
            !!confirmPassword &&
            newPassword !== confirmPassword
          }
          borderRadius={50}
          _hover={{
            bg: "blue.500",
          }}
        >
          Update
        </Button>
      </Stack>
    </React.Fragment>
  );
};

export default ResetPassword;
