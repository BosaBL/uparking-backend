# Generated by Django 5.0.6 on 2024-06-02 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "administration",
            "0003_remove_estacionamiento_check_capacity_leq_capacity_max_and_more",
        ),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name="estacionamiento",
            name="check_capacity_leq_capacity_max",
        ),
        migrations.AddConstraint(
            model_name="estacionamiento",
            constraint=models.CheckConstraint(
                check=models.Q(("capacidad__lte", models.F("capacidad_max"))),
                name="check_capacity_leq_capacity_max",
                violation_error_code="invalid_capacity",
                violation_error_message="Current capacity cant be greater than max capacity.",
            ),
        ),
    ]
