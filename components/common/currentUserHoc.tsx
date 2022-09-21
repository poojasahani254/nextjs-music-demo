import {useMe} from "../../helper/hooks";
import {FC, ReactElement, useEffect} from "react";

interface CurrentUserHocProps {
    children: ReactElement<any, any> | null;
    setUser: (user: any) => void;
}

const CurrentUserHoc: FC<CurrentUserHocProps> = (props) => {
    const { user } = useMe();

    useEffect(() => {
        (async () => {
            const users = user && (await user?.clone().json());
            props.setUser(users);
        })();
    }, [user]);

    return props.children;
}

export default CurrentUserHoc;
