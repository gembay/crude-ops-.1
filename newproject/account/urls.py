

from django.urls import path
from .views import get_vehicle,create_vehicle,vehicle_details

urlpatterns = [

path('vehicle/',get_vehicle,name="getVehicle"),
path('vehicle/create/',create_vehicle,name="createVehicle"),
path('vehicle/<int:pk>/',vehicle_details,name="vehicleDetails"),

]