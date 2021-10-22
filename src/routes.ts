import Feed from "./components/feed/Feed";
import ProfilesList from "./components/profiles-list/ProfilesList";
import Profile from "./components/profile/Profile";

const routes = {
  feed: {
    path: "/feed",
    component: Feed,
  },
  profiles: {
    path: "/profiles",
    component: ProfilesList,
  },
  profileById: {
    path: "/profile/:id",
    component: Profile,
    getPathWithParam: (id: string) => `/profile/${id}`,
  },
};

export default routes;
