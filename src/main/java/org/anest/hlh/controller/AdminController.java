package org.anest.hlh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    @GetMapping
    public String admin() {  // /admin
        return "admin/dashboard";
    }

    @GetMapping("/user")
    public String userManagement() { // /admin/user
        return "users/list";
    }
}
