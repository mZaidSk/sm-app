import ChangePassword from "./ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, getUserById } from "@/store/slice/UserSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";

const ProfilePassword = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: RootState) => state.auth.user || {});
  // const user = useSelector((state: RootState) => state.user.user || {});

  // Fetch user profile
  useEffect(() => {
    if (id) {
      dispatch(getUserById({ id }));
    } else {
      dispatch(getUser());
    }
  }, [id, dispatch]);

  return (
    <div>
      <ChangePassword password={authUser.password} />
    </div>
  );
};

export default ProfilePassword;
