package com.example.login;

import com.example.login.pojo.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LoginApplicationTests {

    @Test
    void contextLoads() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        User user = User.builder().name("test").id(123).build();
        String writer = objectMapper.writeValueAsString(user);
        System.out.println(writer);
        User read = objectMapper.readValue(writer, User.class);
        System.out.println(read);
    }

}


