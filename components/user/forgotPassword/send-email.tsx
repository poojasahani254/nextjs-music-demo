import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import fetcher from "../../../lib/fetcher";

interface SendEmailProps {
  onContinue: (rspData?: any) => void;
  onChange: (value: any) => void;
  email: string;
}

const SendEmail: FC<SendEmailProps> = (props) => {
  async function onSendEmail() {
    if (props.email) {
      const rsp = await fetcher(
        "/user/reset-password/send-email",
        {
          email: props.email,
        },
        "POST"
      );
      let rspData = await rsp.json();

      if (rsp.ok && rsp.status === 200) {
        props.onContinue(rspData);
      }
    }
  }

  return (
    <React.Fragment>
      <Stack>
        <Heading fontSize={"3xl"} color={"whitesmoke"}>
          Password assistance
        </Heading>
        <Text fontSize={"sm"} color={"gray.50"}>
          Enter the email address associated with your musicHigh account.
        </Text>
      </Stack>
      <Stack spacing={4} marginTop={8} color={"brand.50"}>
        <FormControl id="email" marginBottom={5}>
          <FormLabel>Email address</FormLabel>
          <Input
            borderRadius={5}
            name="email"
            type="email"
            onChange={props.onChange}
          />
        </FormControl>
        <Button
          onClick={onSendEmail}
          bg={"blue.400"}
          color={"gray.50"}
          disabled={!props.email}
          borderRadius={50}
          _hover={{
            bg: "blue.500",
          }}
        >
          Continue
        </Button>
      </Stack>
    </React.Fragment>
  );
};

export default SendEmail;
