import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    gridContainer: {
      marginTop: theme.spacing(8),
    },
    logo: {
      height: theme.spacing(7),
      width: theme.spacing(7),
      marginRight: theme.spacing(1),
    },
    toolbar: {
      padding: 0,
    },
    logoHeader: {
      fontWeight: 600,
    },
  })
);

export default useStyles;
