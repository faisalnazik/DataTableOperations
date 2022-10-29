from rest_framework import serializers
from .models import User


class UserListSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    name = serializers.CharField(read_only=True)
    company = serializers.CharField(read_only=True)
    role = serializers.CharField(read_only=True)
    isVerified = serializers.BooleanField(read_only=True, source="is_verified")
    status = serializers.CharField(read_only=True)


class UserUpdateSerializer(serializers.ModelSerializer):
    isVerified = serializers.BooleanField(source="is_verified")

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "company",
            "role",
            "isVerified",
            "status",
        ]

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.company = validated_data.get("company", instance.company)
        instance.role = validated_data.get("role", instance.role)
        instance.is_verified = validated_data.get("isVerified", instance.is_verified)
        instance.status = validated_data.get("status", instance.status)
        instance.save()
        return instance
