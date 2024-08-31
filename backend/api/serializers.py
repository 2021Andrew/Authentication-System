from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note
class NoteSerializer(serializers.ModelSerializer):
    class meta:
        model = Note
        fields = ["id", "title","content","author","created_at"]
        extra_Kwargs ={ "author": {"read_only": True}
                        }
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        # Extract the password from validated data
        password = validated_data.pop('password', None)
        
        # Create a new user
        user = User(**validated_data)
        
        # Set the user's password (hashes it)
        if password:
            user.set_password(password)
            user.save()
        
        return user
