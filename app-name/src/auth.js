import axios from 'axios';
import Vue from "vue";
import service from "@/utils/login"

Vue.prototype.$axios = axios

const defaultUser = {
  email: '未登录',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};
// auth.js

export const requiresAuth = true;

export default {
  tokenHeader: "Authorization",
  email: "email",
  _user: defaultUser,
  loggedIn: await function () {
    try {
      return service.get('http://localhost:9000/login/info').then(res => {
        console.log(res);
        if (res.data === ""){
          console.log("未登录");
          return false;
        } else {
          console.log(res);
          this._user.email = res.data.name
          return true;
        }
      })

    } catch (e) {
      console.log(e);
      return false;
    }

  },
  async logIn(email, password) {
    try {
      const response = await service.post('http://localhost:9000/login', {
        name: email,
        password: password
      });
      if (response.data === "") {
        return {
          isOk: false,
          message: "用户名或密码错误"
        };
      } else {
        this._user = { ...defaultUser, email };
        return {
          isOk: true,
          data: this._user
        };
      }
    } catch (err) {
      console.log(err);
      return {
        isOk: false,
        message: "用户名或密码错误"
      };
    }

  },

  async logOut() {
    try {
      await service.get('http://localhost:9000/logout');
    } catch (e) {
      console.log(e);
    }
  },

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false
      };
    }
  },

  async resetPassword(email) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  },

  async changePassword(email, recoveryCode) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  },

  async createAccount(email, password) {
    try {
      // Send request
      console.log(email, password);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }
};
