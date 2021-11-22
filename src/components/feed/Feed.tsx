import { Box } from "@material-ui/core";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Post from "./post/Post";
import { Error } from "../error/Error";
import { closeErrorMessage } from "./feedSlice";
import { Loading } from "../loading/Loading";
import PostingForm from "./posting-form/PostingForm";

export default function Feed() {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.feed);
  const isLoading = useAppSelector((state) => state.app.isLoading);

  useEffect(() => {
    dispatch({ type: "feed/requestGetAllPosts" });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Box>
      <PostingForm />
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
