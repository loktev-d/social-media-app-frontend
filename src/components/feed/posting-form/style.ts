import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    flex: {
      display: "flex",
    },
    button: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
  })
);

export default useStyles;
