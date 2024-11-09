
from rest_framework.decorators import api_view
from .models import Vehicle
from .serializer import VehicleSerializer
from rest_framework.response import Response
from rest_framework import status



@api_view(['GET'])
def get_vehicle(request):
    vehicles = Vehicle.objects.all()
    serializerData = VehicleSerializer(vehicles,many=True).data
    return Response(serializerData)



@api_view(['POST'])
def create_vehicle(request):
    data = request.data
    serializer = VehicleSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_204_NO_CONTENT)



@api_view(['PUT','DELETE'])
def vehicle_details(request,pk):
    try:
        vehicle = Vehicle.objects.get(pk=pk)
    except Vehicle.DoesNotExist:
        return Response(status=status.HTTP_502_BAD_GATEWAY)
    if request.method == 'DELETE':
        vehicle.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data = request.data
        serializer = VehicleSerializer(vehicle,data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_204_NO_CONTENT)
