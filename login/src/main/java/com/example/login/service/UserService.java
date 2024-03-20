package com.example.login.service;

import com.example.login.mapper.UserMapper;
import com.example.login.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public User find(String name, String password) {
        return userMapper.find(name, password);
    }
}
