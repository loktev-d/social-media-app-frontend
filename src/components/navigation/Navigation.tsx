import {
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { navItems } from "../../nav-items";

function Navigation() {
  return (
    <List component="nav">
      {navItems.map((item, index) => (
        <ListItem key={index} button component={Link as any} to={item.path}>
          <ListItemIcon>
            <Icon>{item.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default Navigation;
