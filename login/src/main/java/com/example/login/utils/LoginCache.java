package com.example.login.utils;

import cn.hutool.cache.CacheUtil;
import cn.hutool.cache.impl.TimedCache;
import com.example.login.pojo.User;

public class LoginCache {
    public static TimedCache<String, User> loginUser = CacheUtil.newTimedCache(604800000);
}
