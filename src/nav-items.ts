import routes from "./routes";

export const navItems = [
  {
    icon: "account_circle",
    name: "My Profile",
    path: routes.profileById.getPathWithParam("616d5c7c4de1f9070a39bcb1"),
  },
  { icon: "feed", name: "Feed", path: routes.feed.path },
  {
    icon: "people",
    name: "Profiles",
    path: routes.profiles.path,
  },
];
