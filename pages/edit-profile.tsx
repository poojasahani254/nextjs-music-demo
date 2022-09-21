import { validateToken } from "../helper/auth";
import { useState } from "react";
import dynamic from "next/dynamic";

const EditProfileScreen = dynamic(
  () => import("../components/user/edit-profile"),
  {
    suspense: true,
  }
);

const CurrentUserHoc = dynamic(
  () => import("../components/common/currentUserHoc"),
  {
    suspense: true,
  }
);

const EditProfile = (props: any) => {
  const [userData, setUser] = useState();
  return (
    <CurrentUserHoc setUser={setUser}>
      <EditProfileScreen user={userData} />
    </CurrentUserHoc>
  );
};

export const getServerSideProps = async (context: any) => {
  let user = validateToken(context.req.cookies.DEMO_ACCESS_TOKEN);
  if (user) {
    return {
      props: { user },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/signIn",
      },
    };
  }
};
export default EditProfile;
