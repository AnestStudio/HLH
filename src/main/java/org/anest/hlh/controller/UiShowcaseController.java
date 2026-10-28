package org.anest.hlh.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller phục vụ hiển thị UI mockup / prototype cho toàn bộ các trang giao diện trong dự án.
 */
@Controller
public class UiShowcaseController {

    // ==========================================
    // 1. TRANG CHỦ & THÔNG TIN CHUNG
    // ==========================================
    @GetMapping("/about")
    public String about() {
        return "home/about";
    }

    // ==========================================
    // 2. PHÒNG TRỌ (RENTALS)
    // ==========================================
    @GetMapping({"/rentals", "/rentals/list"})
    public String rentalsList() {
        return "rentals/list";
    }

    @GetMapping("/rentals/detail")
    public String rentalDetail() {
        return "rentals/detail";
    }

    @GetMapping("/rentals/map")
    public String rentalsMap() {
        return "rentals/map";
    }

    // ==========================================
    // 3. TÌM BẠN Ở GHÉP (ROOMMATES)
    // ==========================================
    @GetMapping({"/roommates", "/roommates/list"})
    public String roommatesList() {
        return "roommates/list";
    }

    @GetMapping("/roommates/detail")
    public String roommateDetail() {
        return "roommates/detail";
    }

    @GetMapping("/roommates/create")
    public String roommateCreate() {
        return "roommates/create";
    }

    @GetMapping("/roommates/edit")
    public String roommateEdit() {
        return "roommates/edit";
    }

    // ==========================================
    // 4. DÀNH CHO CHỦ TRỌ (OWNER)
    // ==========================================
    @GetMapping("/owner/dashboard")
    public String ownerDashboard() {
        return "owner/dashboard";
    }

    @GetMapping("/owner/my-rentals")
    public String ownerMyRentals() {
        return "owner/my-rentals";
    }

    @GetMapping("/owner/create-rental")
    public String ownerCreateRental() {
        return "owner/create-rental";
    }

    @GetMapping("/owner/edit-rental")
    public String ownerEditRental() {
        return "owner/edit-rental";
    }

    // ==========================================
    // 5. TÀI KHOẢN CÁ NHÂN (ACCOUNT)
    // ==========================================
    @GetMapping("/account/profile")
    public String accountProfile() {
        return "account/profile";
    }

    @GetMapping("/account/edit-profile")
    public String accountEditProfile() {
        return "account/edit-profile";
    }

    @GetMapping("/account/favorites")
    public String accountFavorites() {
        return "account/favorites";
    }

    @GetMapping("/account/my-reviews")
    public String accountMyReviews() {
        return "account/my-reviews";
    }

    // ==========================================
    // 6. TIN NHẮN (MESSAGES)
    // ==========================================
    @GetMapping("/messages/inbox")
    public String messagesInbox() {
        return "messages/inbox";
    }

    @GetMapping("/messages/conversation")
    public String messagesConversation() {
        return "messages/conversation";
    }

    // ==========================================
    // 7. ĐÁNH GIÁ (REVIEWS)
    // ==========================================
    @GetMapping("/reviews/list")
    public String reviewsList() {
        return "reviews/list";
    }

    @GetMapping("/reviews/create")
    public String reviewCreate() {
        return "reviews/create";
    }

    @GetMapping("/reviews/edit")
    public String reviewEdit() {
        return "reviews/edit";
    }

    // ==========================================
    // 8. QUẢN LÝ NGƯỜI DÙNG (USERS)
    // ==========================================
    @GetMapping("/users/list")
    public String usersList() {
        return "users/list";
    }

    @GetMapping("/users/detail")
    public String userDetail() {
        return "users/detail";
    }

    @GetMapping("/users/form")
    public String userForm() {
        return "users/form";
    }

    // ==========================================
    // 9. TRANG LỖI HỆ THỐNG (ERROR PAGES)
    // ==========================================
    @GetMapping("/error/403")
    public String error403() {
        return "error/403";
    }

    @GetMapping("/error/404")
    public String error404() {
        return "error/404";
    }

    @GetMapping("/error/500")
    public String error500() {
        return "error/500";
    }

    // ==========================================
    // 10. PREVIEW CHO ADMIN (CHO PHÉP XEM UI ADMIN MÀ KHÔNG BỊ CHẶN 403 NẾU CHƯA CÓ ROLE ADMIN)
    // ==========================================
    @GetMapping("/preview/admin/dashboard")
    public String previewAdminDashboard() {
        return "admin/dashboard";
    }

    @GetMapping("/preview/admin/users")
    public String previewAdminUsers() {
        return "admin/users";
    }

    @GetMapping("/preview/admin/settings")
    public String previewAdminSettings() {
        return "admin/settings";
    }

    @GetMapping("/preview/admin/reports")
    public String previewAdminReports() {
        return "admin/reports";
    }
}

