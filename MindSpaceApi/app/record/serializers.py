

from rest_framework import serializers

from core.models import Record, Insight

class RecordSerializers(serializers.ModelSerializer):
    """Serializer for emotion records objects"""

    class Meta:
        model = Record
        fields = ('id','emotion','posted_date')
        read_only_fields = ('id',)


class InsightSerializers(serializers.ModelSerializer):
    """Serializer for insight records objects"""

    class Meta:
        model = Insight
        fields = ('id', 'reflection', 'posted_date', 'tag')
        read_only_fields = ('id', 'posted_date')