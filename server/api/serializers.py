from rest_framework import serializers
from api.models import *
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from api.utils import Util

class WriterRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = Writer
        fields = ['email', 'fname', 'lname', 'password', 'password2', 'tc']
        extra_kwargs={
            'password': {'write_only':True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        return attrs
    
    def create(self, validate_data):
        return Writer.objects.create_user(**validate_data)

class WriterLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = Writer
        fields = ['email', 'password']

class WriterChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        user.set_password(password)
        user.save()
        return attrs

class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        fields = ['email']
    
    def validate(self, attrs):
        email = attrs.get('email')
        if Writer.objects.filter(email=email).exists():
            writer = Writer.objects.get(email=email)
            wId = urlsafe_base64_encode(force_bytes(writer.id))
            print('Encoded wId', wId)
            token = PasswordResetTokenGenerator().make_token(writer)
            print('Token', token)
            link = 'http://localhost:3000/api/writer/reset/'+wId+'/'+token
            print('Password reset link', link)
            # Send email
            body = 'Click Following Link to Reset Your Password'+link
            data = {
                'subject': 'Reset your password',
                'body': body,
                'to_email': writer.email
            }
            Util.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError('You are not a Registered Writer')

class WriterPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    
    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            wId = self.context.get('wId')
            token = self.context.get('token')

            if password != password2:
                raise serializers.ValidationError("Password and Confirm Password does not match!!")
            id = smart_str(urlsafe_base64_decode(wId))
            writer = Writer.objects.get(id=id)
            
            if not PasswordResetTokenGenerator().check_token(writer, token):
                raise serializers.ValidationError("Token is not valid or Expired")
            
            writer.set_password(password)
            writer.save()
            return attrs
        
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(writer, token)
            raise serializers.ValidationError("Token is not valid or Expired")

class WriterPorfileSerializer(serializers.HyperlinkedModelSerializer):
    id=serializers.ReadOnlyField()
    class Meta:
        model = Writer
        fields = ['id', 'email', 'fname', 'lname', 'bio', 'image', 'fUrl', 'tUrl', 'iUrl']

class NewsSerializer(serializers.HyperlinkedModelSerializer):
    nId=serializers.ReadOnlyField()
    class Meta:
        model=News
        fields="__all__"

class CountSerializer(serializers.HyperlinkedModelSerializer):
    aId=serializers.ReadOnlyField()
    class Meta:
        model=Count
        fields="__all__"

# class NewsSearchSerializer(serializers.HyperlinkedModelSerializer):
#     nId=serializers.ReadOnlyField()
#     class Meta:
#         model=News
#         fields="__all__"

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    cId=serializers.ReadOnlyField()
    class Meta:
        model=Comment
        fields="__all__"