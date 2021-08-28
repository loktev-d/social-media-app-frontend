import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    post: {
      marginBottom: theme.spacing(2),
      maxHeight: (props: { isExpanded: boolean }) =>
        props.isExpanded ? "none" : theme.spacing(70),
    },
    media: {
      height: theme.spacing(40),
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  })
);

export default useStyles;
