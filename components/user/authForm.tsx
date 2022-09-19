import {
  Box,
  Input,
  Button,
  useColorModeValue,
  Stack,
  FormControl,
  FormLabel,
  Checkbox,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { auth } from "../../helper/mutation";
import Link from "next/link";

interface AuthFormState {
  email: string;
  password: string;
}
const AuthForm: FC<{ mode: "signIn" | "signup" }> = ({ mode }) => {
  const [value, setValue] = useState<AuthFormState>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const rsp = await auth(
      mode,
      {
        email: value.email,
        password: value.password,
      },
      "POST"
    );

    if (rsp.ok && rsp.status === 200) {
      setIsLoading(false);
      await router.push("/");
    } else {
      setIsLoading(false);
    }
  };

  const onChange = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  async function handleSignUp() {
    await router.push("/signup");
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
          <Stack align={"center"}>
            <Heading fontSize={"3xl"} color={"whitesmoke"}>
              Sign in to your account
            </Heading>
            <Text fontSize={"sm"} color={"gray.50"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Stack spacing={4} marginTop={20} color={"brand.50"}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                borderRadius={10}
                name="email"
                type="email"
                onChange={onChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                borderRadius={10}
                name="password"
                type="password"
                onChange={onChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"flex-end"}
              >
                <Link href={"/forgot-password"}>
                  <Text color={"blue.400"} as="u" cursor={"pointer"}>
                    Forgot password?
                  </Text>
                </Link>
              </Stack>
              <Button
                onClick={handleSubmit}
                bg={"blue.400"}
                isLoading={isLoading}
                color={"gray.50"}
                borderRadius={50}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
          <Divider orientation="horizontal" marginY={5} />
          <Stack spacing={5} justify={"space-between"}>
            <Stack
              marginTop={3}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Heading alignItems={"center"} fontSize={"sm"} color={"gray.50"}>
                Don't have an account
              </Heading>
            </Stack>
            <Button
              bg={"gray.500"}
              color={"white"}
              borderRadius={50}
              _hover={{
                bg: "gray.400",
              }}
              onClick={handleSignUp}
            >
              Sign up
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default AuthForm;
