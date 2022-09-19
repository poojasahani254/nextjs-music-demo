import ForgotPasswordHome from "../components/user/forgotPassword/forgot-password-home";
import { validateToken } from "../helper/auth";

const ForgotPassword = () => {
  return <ForgotPasswordHome />;
};

ForgotPassword.authPage = true;

export async function getServerSideProps({ req }: any) {
  const user = validateToken(req.cookies.DEMO_ACCESS_TOKEN);
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

export default ForgotPassword;
