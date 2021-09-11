import { Box } from "@material-ui/core";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Post from "./post/Post";
import { Error } from "../error/Error";
import { closeErrorMessage } from "./feedSlice";

export default function Feed() {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.feed);
  useEffect(() => {
    dispatch({ type: "feed/requestGetAllPosts" });
  }, []);

  return (
    <Box>
      {store.feed.map((post) => (
        <Post post={post}></Post>
      ))}
      <Error
        message={store.errorMessage}
        open={store.isErrorMessageOpened}
        onClose={() => dispatch(closeErrorMessage())}
      ></Error>
    </Box>
  );
}
