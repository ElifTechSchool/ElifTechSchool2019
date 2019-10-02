import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/users",
      name: "users",
      component: () => import("./views/Users.vue")
    },
    {
      path: "/add_user",
      name: "add_user",
      component: () => import("./views/AddUser.vue")
    },
    {
      path: "/userDetails/:Uid",
      name: "userDetails",
      component: () => import("./views/UserDetails.vue")
    },
    {
      path: "/ranks",
      name: "ranks",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./components/RanksList/RanksList.vue"
        )
    },
    {

      path: "/achievements",
      name: "achievements",
      component: () => import("./views/Achievements/Achievements.vue")
    },
    {
      path: "/achievements/create",
      name: "create_achievement",
      component: () => import("./views/Achievements/AddAchievement.vue")
    },
    {
      path: "/achievements/:id",
      name: "achievementDetails",
      component: () => import("./views/Achievements/AchievementDetails.vue")
    },
    {
      path: "/competitions",
      name: "competitions",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Competitions.vue")
    },
    {
      path: "/competitions/:id",
      name: "competitionDetails",
      component: () => import("./views/CompetitionDetails.vue")
    },
  ]
});
