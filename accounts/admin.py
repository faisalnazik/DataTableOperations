from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

# Register your models here.
from .models import User


class CustomUserAdmin(UserAdmin):
    list_display = ("name", "company", "role", "is_verified", "status")
    fieldsets = (
        (None, {"fields": ("username",)}),
        (_("Personal info"), {"fields": ("name", "company", "role")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "is_verified",
                    "status",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )


admin.site.register(User, CustomUserAdmin)
