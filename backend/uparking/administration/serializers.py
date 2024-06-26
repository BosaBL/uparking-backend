from rest_framework import serializers

from uparking.administration.models import FeedBack, Sede
from uparking.authentication.models import CustomUser

from .models import Estacionamiento


class EstacionamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estacionamiento
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "rut",
            "p_nombre",
            "s_nombre",
            "p_apellido",
            "s_apellido",
            "email",
            "rol",
        ]
        read_only_fields = ["id", "rut", "email"]


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "rut",
            "p_nombre",
            "s_nombre",
            "p_apellido",
            "s_apellido",
            "email",
            "rol",
        ]
        read_only_fields = [
            "id",
            "rut",
            "email",
            "p_nombre",
            "s_nombre",
            "p_apellido",
            "s_apellido",
        ]


class CreateSedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = "__all__"


class UpdateSedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = "__all__"
        read_only_fields = ["id"]


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedBack
        fields = "__all__"
        read_only_fields = ["id", "leido"]
