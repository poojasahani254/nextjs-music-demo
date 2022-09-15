import OtpInput from "react-otp-input";
import { FC, useState } from "react";
import React from "react";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";

interface OtpScreenProps {
  onContinue: () => void;
  email: string;
  userData: any;
}

const OtpScreen: FC<OtpScreenProps> = (props) => {
  const [otp, setOtp] = useState("");
  const [disabledVerification, setDisabledVerification] = useState(true);

  function onChange(otp: any) {
    setOtp(otp);
  }

  function verifyOtp() {
    if (props.userData?.resetToken === otp) {
      props.onContinue();
    } else {
      setDisabledVerification(false);
    }
  }

  return (
    <React.Fragment>
      <Stack>
        <Heading fontSize={"3xl"} color={"whitesmoke"}>
          OTP Verification
        </Heading>
        <Text fontSize={"sm"} color={"gray.50"}>
          Enter the otp sent to {props.email}
        </Text>
      </Stack>
      <Stack spacing={4} marginTop={8} color={"brand.50"}>
        <OtpInput
          value={otp}
          onChange={onChange}
          numInputs={6}
          separator={<span>&nbsp;&nbsp;&nbsp;</span>}
          inputStyle={{
            border: "1px solid transparent",
            borderRadius: "8px",
            width: "54px",
            height: "54px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "400",
            caretColor: "#439bde",
            marginBottom: "2rem",
          }}
          focusStyle={{
            border: "1px solid #439bde",
            outline: "none",
          }}
        />
        <Button
          onClick={verifyOtp}
          bg={"blue.400"}
          disabled={otp.length !== 6 && disabledVerification}
          color={"gray.50"}
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

export default OtpScreen;
