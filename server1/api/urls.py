from django.urls import path, include
from rest_framework import routers
from api.views import *

router = routers.DefaultRouter()

router.register(r'profile', WriterProfileViewSet)
router.register(r'news', NewsViewSet)
router.register(r'comment', CommentViewSet)


urlpatterns = [
    path('register/', WriterRegView.as_view(), name='register'),
    path('login/', WriterLoginView.as_view(), name='login'),
    path('change-password/', WriterChangePasswordView.as_view(), name='change-password'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<wId>/<token>/', WriterPasswordResetView.as_view(), name='reset-password'),

    # path('news-search/', SearchNewsList.as_view(), name='news-search'),
    path('', include(router.urls)),
]