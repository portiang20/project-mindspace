from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

#Recommended way to retreive settings
from django.conf import settings

class UserManager(BaseUserManager):

    def create_user(self, uid, password, **extra_fields):
        """Creates and saves a new user using uid (from google) as username_field"""
        if not uid:
            raise ValueError('UID not passing')

        user = self.model(uid=uid, **extra_fields)
        user.set_password(password)
        if 'email' in extra_fields:
            user.email = self.normalize_email(extra_fields['email'])
        user.save(using=self._db)
        
        return user

    def create_superuser(self, uid, password):
        """Creates and saves a new super user using uid (from google) as username_field"""
        user = self.create_user(uid, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports uid and info returned from firebase"""
    uid = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, blank=True)
    name = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'uid'

# Create your models here.
class Record(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    emotion = models.CharField(max_length=255)
    posted_date = models.DateField()
    post = models.TextField()
    
    # string representation
    def __str__(self):
        return self.emotion + ' (Posted on: ' + self.posted_date.strftime('%Y-%m-%d') + ')'

# Create your models here.
class Insight(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    reflection = models.TextField()
    posted_date = models.DateField()
    tag = models.CharField(max_length=255)
    
    # string representation
    def __str__(self):
        return self.tag + ' (Posted on: ' + self.posted_date.strftime('%Y-%m-%d') + ')'


        

