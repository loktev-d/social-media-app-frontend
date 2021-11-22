import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    paperBio: {
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    },
    paperAvatar: {
      padding: theme.spacing(1),
    },
    avatarContainer: {
      height: "210px",
      overflow: "hidden",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
    },
    avatar: {
      height: "210px",
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

export default useStyles;
