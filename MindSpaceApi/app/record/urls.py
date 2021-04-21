from django.urls import path, include
from rest_framework.routers import DefaultRouter

from record import views

app_name = 'record'

router = DefaultRouter()
router.register('emotions', views.RecordViewSet)

#name field is the name for reverse function to map 
urlpatterns = [
    path('', include(router.urls))
]