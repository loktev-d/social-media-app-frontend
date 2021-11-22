import { useEffect } from "react";
import { Paper, Grid, Box, Typography, Divider } from "@material-ui/core";
import { useParams } from "react-router";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Loading } from "../loading/Loading";
import { Error } from "../error/Error";
import { closeErrorMessage } from "./profileSlice";
import useStyles from "./style";

export default function Profile() {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const store = useAppSelector((state) => state.profile);
  const { id } = useParams<any>();

  const dispatch = useAppDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch({
      type: "profile/requestGetUser",
      payload: id,
    });
  }, [id]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Paper className={classes.paperAvatar}>
            <Box className={classes.avatarContainer}>
              {store.user?.profilePicture ? (
                <img
                  className={classes.avatar}
                  src={`data:image/png;base64, ${store.user?.profilePicture}`}
                  alt="Avatar"
                />
              ) : null}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paperBio}>
            <Typography variant="h5">{`${store.user?.firstName} ${store.user?.lastName}`}</Typography>
            <Divider className={classes.divider} />
            <Box>
              <Typography variant="subtitle1" color="textSecondary">
                Bio
              </Typography>
              <Typography variant="body2">{store.user?.bio}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Error
        message={store.errorMessage}
        open={store.isErrorMessageOpened}
        onClose={() => dispatch(closeErrorMessage())}
      ></Error>
    </>
  );
}
