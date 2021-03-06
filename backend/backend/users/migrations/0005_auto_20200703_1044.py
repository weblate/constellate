# Generated by Django 3.0.7 on 2020-07-03 10:44

from django.db import migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0003_taggeditem_add_unique_index'),
        ('users', '0004_profile_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='tags',
            field=taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]
