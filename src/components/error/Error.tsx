import { Snackbar, SnackbarCloseReason } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export function Error(props: {
  message?: string;
  open?: boolean;
  onClose?: (event: React.SyntheticEvent<any, Event>) => void;
}) {
  return (
    <Snackbar open={props.open} onClose={props.onClose}>
      <Alert severity="error" variant="filled" onClose={props.onClose}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}
