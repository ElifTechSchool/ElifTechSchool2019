import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store/store";

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
      component: () => import("./views/Users/Users.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/add_user",
      name: "add_user",
      component: () => import("./views/Users/AddUser.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/userDetails/:Uid",
      name: "userDetails",
      component: () => import("./views/Users/UserDetails.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/editUser/:Uid",
      name: "editUser",
      component: () => import("./views/Users/EditUser.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/ranks",
      name: "ranks",
      component: () => import("./views/Ranks/RanksList/RanksList.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/achievements",
      name: "achievements",
      component: () => import("./views/Achievements/Achievements.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/achievements/create",
      name: "create_achievement",
      component: () => import("./views/Achievements/AddAchievement.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/achievements/:id",
      name: "achievementDetails",
      component: () => import("./views/Achievements/AchievementDetails.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/achievements/:id/edit",
      name: "EditAchievement",
      component: () => import("./views/Achievements/EditAchievement.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/competitions",
      name: "competitions",
      component: () => import("./views/Competitions/Competitions.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/competitions/:id",
      name: "competitionDetails",
      component: () => import("./views/Competitions/CompetitionDetails.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/add_competition",
      name: "add_competition",
      component: () => import("./views/Competitions/AddCompetition.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/editCompetition/:id",
      name: "editCompetition",
      component: () => import("./views/Competitions/EditCompetition.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/ranks/add",
      name: "addRanks",
      component: () => import("./views/Ranks/AddRank.vue"),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) next("/");
        else next();
      }
    },
    {
      path: "/changePassword",
      name: "changePassword",
      component: () => import("./views/ChangePassword.vue")
    }
  ]
});
