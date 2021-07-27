import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function Feed() {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.feed);
  useEffect(() => {
    dispatch({ type: "feed/requestGetAllPosts" });
  });
  return <p>{store}</p>;
}
