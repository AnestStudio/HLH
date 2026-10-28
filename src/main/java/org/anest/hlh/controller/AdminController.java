package org.anest.hlh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    @GetMapping({"", "/dashboard"})
    public String admin() {
        return "admin/dashboard";
    }

    @GetMapping({"/user", "/users"})
    public String userManagement() {
        return "admin/users";
    }

    @GetMapping("/settings")
    public String settings() {
        return "admin/settings";
    }

    @GetMapping("/reports")
    public String reports() {
        return "admin/reports";
    }

    @GetMapping({"/user/form", "/user/edit"})
    public String userForm() {
        return "users/form";
    }
}
