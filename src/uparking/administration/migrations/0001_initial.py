# Generated by Django 5.0.6 on 2024-06-06 02:13

import django.contrib.gis.db.models.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="FeedBack",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("comentario", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("leido", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="Sede",
            fields=[
                (
                    "id",
                    models.CharField(max_length=10, primary_key=True, serialize=False),
                ),
                ("nombre", models.CharField(max_length=50)),
                ("direccion", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="Vehiculo",
            fields=[
                (
                    "patente",
                    models.CharField(max_length=6, primary_key=True, serialize=False),
                ),
                ("color", models.CharField(max_length=20)),
                ("fabricante", models.CharField(max_length=10)),
                ("descripcion", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="VigilanteNotifica",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("mensaje", models.TextField()),
                ("leido", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("notificar", models.BooleanField(default=False)),
                ("last_notified", models.DateTimeField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Estacionamiento",
            fields=[
                (
                    "id",
                    models.CharField(max_length=10, primary_key=True, serialize=False),
                ),
                ("nombre", models.CharField(max_length=50)),
                ("capacidad", models.PositiveIntegerField(default=0)),
                ("capacidad_max", models.PositiveIntegerField(default=0)),
                (
                    "area_espacio",
                    django.contrib.gis.db.models.fields.PolygonField(srid=4326),
                ),
                (
                    "sede",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="administration.sede",
                    ),
                ),
            ],
        ),
    ]
