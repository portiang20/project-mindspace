from rest_framework import viewsets, mixins 
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Record
from record import serializers
from datetime import datetime

class BearerTokenAuthentication(TokenAuthentication):
    keyword = 'Bearer'

# viewsets.ModelViewSet allows creating all the functionalities of a view set, not for listing only
class RecordViewSet(viewsets.ModelViewSet):
    """Manage emotion records in the database"""
    serializer_class = serializers.RecordSerializers
    queryset = Record.objects.all()
    authentication_classes = (BearerTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the emotion records for the authenticated user"""
        queryset = self.queryset.filter(user=self.request.user)
        if 'from' in self.request.query_params:
            from_date = datetime.strptime(self.request.query_params['from'],'%Y-%m-%d').date()
            queryset = queryset.filter(posted_date__gte=from_date)
        if 'to' in self.request.query_params:
            to_date = datetime.strptime(self.request.query_params['to'],'%Y-%m-%d').date()
            queryset = queryset.filter(posted_date__lte=to_date)
        return queryset