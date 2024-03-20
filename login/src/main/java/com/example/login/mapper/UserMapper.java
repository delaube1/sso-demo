package com.example.login.mapper;

import com.example.login.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
public interface UserMapper {

    User find(@Param("name")String username, @Param("password")String password);
}
