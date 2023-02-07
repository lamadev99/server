from django.db import models
from PIL import Image
from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)

class UserManager(BaseUserManager):
    def create_user(self, email, fname, lname, tc, password=None, password2=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            fname=fname,
            lname=lname,
            tc=tc
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, fname, lname, tc, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            fname=fname,
            lname=lname,
            tc=tc
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class Writer(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(verbose_name='Email', max_length=255, unique=True)
    fname = models.CharField(max_length=255)
    lname = models.CharField(max_length=255)
    bio = models.TextField()
    fUrl = models.CharField(max_length=255)
    tUrl = models.CharField(max_length=255)
    iUrl = models.CharField(max_length=255)
    image = models.ImageField(upload_to='profile/', null=True, blank=True)

    tc = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fname', 'lname', 'tc']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return  self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
        

class News(models.Model):
    writer = models.ForeignKey(Writer, on_delete=models.CASCADE)
    nId = models.AutoField(primary_key=True)            
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    subCategory = models.CharField(max_length=255)
    content = models.TextField()
    metaWord = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255)
    is_featured = models.BooleanField(default=False)
    image = models.ImageField(upload_to='news/', null=False, blank=False)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)

        if img.height > 720 or img.width > 1280:
            output_size = (1280, 720)
            img.thumbnail(output_size)
            img.save(self.image.path)

class Comment(models.Model):
    cId = models.AutoField(primary_key=True)
    fName = models.CharField(max_length=255, blank=False)
    email = models.EmailField(max_length=255, blank=False)
    comment = models.TextField()
    is_save = models.BooleanField(default=False)