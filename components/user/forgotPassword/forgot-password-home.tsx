import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import SendEmail from "./send-email";
import OtpScreen from "./otp-screen";
import { useState } from "react";
import ResetPassword from "./reset-password";

const ForgotPasswordHome = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({});

  const onContinue = (data?: any) => {
    setUserData(data);
    setStep((currentStep) => currentStep + 1);
  };

  function onChange(e: any) {
    setEmail(e.target.value);
  }

  return (
    <Box
      minH={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      bg={useColorModeValue("brand.800", "brand.700")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("brand.600", " brand.600")}
          boxShadow={"lg"}
          p={8}
        >
          {step === 0 && (
            <SendEmail
              onContinue={onContinue}
              onChange={onChange}
              email={email}
            />
          )}
          {step === 1 && (
            <OtpScreen
              onContinue={onContinue}
              email={email}
              userData={userData}
            />
          )}
          {step === 2 && <ResetPassword email={email} />}
        </Box>
      </Stack>
    </Box>
  );
};

export default ForgotPasswordHome;
