

from rest_framework import serializers

from core.models import Record 

class RecordSerializers(serializers.ModelSerializer):
    """Serializer for emotion records objects"""

    class Meta:
        model = Record
        fields = ('id','emotion','posted_date')
        read_only_fields = ('id',)