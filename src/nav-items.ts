import Feed from "./components/feed/Feed";
import ProfilesList from "./components/profiles-list/ProfilesList";

export const navItems = [
  {
    icon: "account_circle",
    name: "My Profile",
    route: "/profile",
    component: Feed,
  },
  { icon: "feed", name: "Feed", route: "/feed", component: Feed },
  {
    icon: "people",
    name: "Profiles",
    route: "/profiles",
    component: ProfilesList,
  },
];
