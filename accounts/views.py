from rest_framework import generics
from .models import User
from .serializers import UserListSerializer, UserUpdateSerializer
from rest_framework.response import Response
from rest_framework import status


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserUpdate(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)
