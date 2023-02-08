from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from api.models import *
from api.serializers import *
from api.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView
from .pagination import MyPagination


# Create your views here.

# Generate Token Manually
def get_tokens_for_writer(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }


class WriterRegView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = WriterRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        writer = serializer.save()
        token = get_tokens_for_writer(writer)
        return Response({'token': token ,'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)

class WriterLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = WriterLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        writer = authenticate(email=email, password=password)
        if writer is not None:
            token = get_tokens_for_writer(writer)
            return Response({'token':token, 'msg':'Login Success!!'}, status=status.HTTP_200_OK)

class WriterChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = WriterChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg': "Password changed successfully."}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg': "Password reset link send. Please check your Email."}, status=status.HTTP_200_OK)

class WriterPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, wId, token, format=None):
    serializer = WriterPasswordResetSerializer(data=request.data, context = {'wId': wId, 'token': token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg': "Password reset successfully."}, status=status.HTTP_200_OK)

class WriterProfileViewSet(viewsets.ModelViewSet):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    queryset = Writer.objects.all()
    serializer_class = WriterPorfileSerializer
    if queryset.count() > 0:
        pagination_class = MyPagination

class NewsViewSet(viewsets.ModelViewSet):
    renderer_classes = [UserRenderer]
    queryset = News.objects.all().order_by('-nId')
    serializer_class = NewsSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category', 'subCategory', 'keywords']
    search_fields = ['^category', '^subCategory', '^title', '^keywords']
    if queryset.count() > 0:
        pagination_class = MyPagination

# class SearchNewsList(ListAPIView):
#     renderer_classes = [UserRenderer]
#     queryset = News.objects.all()
#     serializer_class = NewsSearchSerializer
#     filter_backends = [SearchFilter]
#     search_fields = ['^category', '^subCategory', '^title', '^tagline']
#     if queryset.count() > 0:
#         pagination_class = MyPagination

class CommentViewSet(viewsets.ModelViewSet):
    renderer_classes = [UserRenderer]
    queryset = Comment.objects.all().order_by('-cId')
    serializer_class = CommentSerializer
    if queryset.count() > 0:
        pagination_class = MyPagination
