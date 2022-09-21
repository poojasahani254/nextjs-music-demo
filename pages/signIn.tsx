import AuthForm from "../components/user/authForm";
import { validateToken } from "../helper/auth";

const SignIn = () => {
  return <AuthForm mode="signIn" />;
};

SignIn.authPage = true;

export async function getServerSideProps(context: any) {
  const user = validateToken(context.req.cookies.DEMO_ACCESS_TOKEN);
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}

export default SignIn;
