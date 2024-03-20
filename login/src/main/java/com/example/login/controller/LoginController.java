package com.example.login.controller;

import com.example.login.pojo.User;
import com.example.login.pojo.UserParam;
import com.example.login.service.UserService;
import com.example.login.utils.LoginCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:8080", allowCredentials = "true")
@RestController
public class LoginController {

    @Autowired
    private UserService userService;

//    @GetMapping("/{name}/-/{password}")
//    public User find(@PathVariable String name, @PathVariable String password) {
//        return userService.find(name, password);
//    }

    @ResponseBody
    @PostMapping("/login")
    public User doLogin(@RequestBody  @Validated UserParam userParam, HttpServletResponse response) {
        User first = userService.find(userParam.getName(), userParam.getPassword());
        //判断用户是否登录
        if (first != null) {
            //保存用户
            String token = UUID.randomUUID().toString();
            Cookie cookie = new Cookie("TOKEN", token);
            cookie.setDomain("localhost");
            cookie.setPath("/");
            cookie.setMaxAge(36000);
            response.addCookie(cookie);
            LoginCache.loginUser.put(token, first);
        } else {
            return null;
        }
        return first;
    }

    @GetMapping("/login/info")
    @ResponseBody
    public User getUserInfo(@CookieValue(required = false, value = "TOKEN") Cookie cookie) {
        if(cookie != null) {
            return LoginCache.loginUser.get(cookie.getValue());
        } else {
            return null;
        }
    }

    @GetMapping("/logout")
    @ResponseBody
    public void logOut(@CookieValue(value = "TOKEN") Cookie cookie, HttpServletResponse response) {
        LoginCache.loginUser.remove(cookie.getValue());
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
