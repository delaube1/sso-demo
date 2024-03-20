import Vue from "vue";
import Router from "vue-router";
import auth from "./auth";

import Home from "./views/home-page";
import Profile from "./views/profile-page";
import Tasks from "./views/tasks-page";
import defaultLayout from "@/layouts/side-nav-outer-toolbar";
import simpleLayout from "@/layouts/single-card";
import navigationLayout from "@/layouts/navigation-card";
import navigation from "./views/navigation-page"

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/navigation",
      name: "navigation",
      meta: { requiresAuth: false },
      components: {
        layout: navigationLayout,
        content: navigation
      }
    },
    {
      path: "/home",
      name: "home",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Home
      }
    },
    {
      path: "/profile",
      name: "profile",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Profile
      }
    },
    {
      path: "/tasks",
      name: "tasks",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Tasks
      }
    },
    {
      path: "/login-form",
      name: "login-form",
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        content: () =>
          import(/* webpackChunkName: "login" */ "./views/login-form")
      },
      props: {
        layout: {
          title: "Sign In"
        }
      }
    },
    {
      path: "/reset-password",
      name: "reset-password",
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        content: () =>
          import(/* webpackChunkName: "login" */ "./views/reset-password-form")
      },
      props: {
        layout: {
          title: "Reset Password",
          description: "Please enter the email address that you used to register, and we will send you a link to reset your password via Email."
        }
      }
    },
    {
      path: "/create-account",
      name: "create-account",
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        content: () =>
          import(/* webpackChunkName: "login" */ "./views/create-account-form")
      },
      props: {
        layout: {
          title: "Sign Up"
        }
      }
    },
    {
      path: "/change-password/:recoveryCode",
      name: "change-password",
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        content: () =>
          import(/* webpackChunkName: "login" */ "./views/change-password-form")
      },
      props: {
        layout: {
          title: "Change Password"
        }
      }
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/recovery",
      redirect: "/home"
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.path === from.path) {
    return
  }
  auth.loggedIn().then((result)=> {
    let res = result;
    if (to.meta.requiresAuth && !res) {
      console.log("未登录，跳转到登陆界面")
      next({
        name: "login-form"
      });
    } else if (to.name === "login-form" && res) {
      next();
    } else {
      console.log("正确跳转")
      next();
    }
  })
});

export default router;
