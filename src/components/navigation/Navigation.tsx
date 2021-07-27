import {
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { navItems } from "./nav-items";

function Navigation() {
  return (
    <List component="nav">
      {navItems.map((item) => (
        <ListItem key={item.name} button>
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
