import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import moment from "moment";

import useStyles from "./style";
import { GetAllPostsResponse } from "../../../api/dto";

export default function Post({ post }: { post: GetAllPostsResponse }) {
  const [isExpanded, setIsExpanded] = useState(
    post.body.length > 200 ? false : true
  );
  const classes = useStyles({ isExpanded });

  return (
    <Card className={classes.post}>
      <CardHeader
        title={post.title}
        subheader={moment(post.created).fromNow()}
      />
      <CardMedia
        component="img"
        src={`data:image/jpeg;base64, ${post.picture}`}
        className={classes.media}
      />
      <CardContent>
        <Typography>
          {isExpanded ? post.body : post.body.slice(0, 200) + "..."}
        </Typography>
      </CardContent>
      {isExpanded ? null : (
        <CardActions>
          <Button color="primary" onClick={() => setIsExpanded(true)}>
            Read more
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
