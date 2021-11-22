import {
  Avatar,
  Button,
  Grid,
  Icon,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import useStyles from "./style";
import { useState, FocusEvent, ChangeEvent } from "react";

export default function PostingForm() {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const [fileName, setFileName] = useState("");

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid className={classes.flex} alignItems="center" item xs={12}>
          <Avatar className={classes.avatar}></Avatar>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            onClick={() => {
              setIsExpanded(true);
            }}
            onBlur={(event: FocusEvent<HTMLInputElement>) => {
              if (!event.target.value) setIsExpanded(false);
            }}
          />
        </Grid>
        {isExpanded ? (
          <>
            <Grid item xs={12}>
              <TextField
                label="What's new?"
                variant="outlined"
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
            <Grid
              className={classes.flex}
              item
              justifyContent="flex-end"
              alignItems="center"
              xs={12}
            >
              <Typography variant="caption">{fileName}</Typography>
              <input
                type="file"
                accept="image/*"
                id="upload-file-input"
                hidden
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setFileName(
                    event.target.files ? event.target.files[0].name : ""
                  );
                }}
              />
              <label htmlFor="upload-file-input">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  component="span"
                  startIcon={<Icon>upload</Icon>}
                >
                  Upload Image
                </Button>
              </label>
              <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
              >
                Submit
              </Button>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Paper>
  );
}
