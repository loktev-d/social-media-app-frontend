import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
} from "@material-ui/core/";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Error } from "../error/Error";
import { Loading } from "../loading/Loading";
import { closeErrorMessage } from "./profilesListSlice";

export default function ProfilesList() {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.profilesList);
  const isLoading = useAppSelector((state) => state.app.isLoading);

  useEffect(() => {
    dispatch({ type: "profilesList/requestGetAllUsers" });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Paper>
      <List>
        {store.profiles.map((profile) => (
          <ListItem key={profile._id} button>
            <ListItemAvatar>
              <Avatar
                src={`data:image/png;base64, ${profile.profilePicture}`}
              >{`${profile.firstName[0].toUpperCase()}${profile.lastName[0].toUpperCase()}`}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${profile.firstName} ${profile.lastName}`}
            />
          </ListItem>
        ))}
      </List>
      <Error
        message={store.errorMessage}
        open={store.isErrorMessageOpened}
        onClose={() => dispatch(closeErrorMessage())}
      ></Error>
    </Paper>
  );
}
