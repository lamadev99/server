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

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

# class SearchNewsList(ListAPIView):


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer