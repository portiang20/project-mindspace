from core.models import Record
import csv
from django.core.management.base import BaseCommand
import os
from django.contrib.auth import get_user_model
from datetime import datetime 

U1_UID = 'm78via5KcyPUSe1XJb0Tu3XwcZD3'
U2_UID = 'h28UH8bcXOVR811IR786r5AlfrJ2'

class Command(BaseCommand):
    """Django command to load csv file into database"""

    def handle(self, *args, **options):
        # Delete all emotion records first
        Record.objects.all().delete()
        u1 = get_user_model().objects.get(uid=U1_UID)
        u2 = get_user_model().objects.get(uid=U2_UID)
        with open('mindspace_dataset.csv', encoding='ISO-8859-1') as datafile:
            reader = csv.reader(datafile, delimiter=',')
            for row in reader:
                if (row[2] != 'PostedDate'): #To check if it is a header row
                    posted_date = datetime.strptime(row[2], '%Y-%m-%d').date()
                    if row[0] == 'U1':
                        Record.objects.create(user=u1,emotion=row[1],posted_date=posted_date,post=row[3])
                