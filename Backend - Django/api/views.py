
import csv
from django.conf import settings
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def airport_list(request):
    file_path = settings.BASE_DIR / 'assets' / 'airports.csv'
    airports = []

    try:
        with open(file_path, mode='r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                airports.append({
                    "city": row["city"],
                    "state": row["state"],
                    "iata": row["iata"]
                })
    except FileNotFoundError:
        return Response({"error": "CSV file not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

    return Response(airports)




def city_list(request):
    search_string = request.GET.get('search', '')  # Get the value of the 'search' query parameter, default to empty string if not provided
    file_path = settings.BASE_DIR / 'assets' / 'uscities.csv'
    cities = []

    try:
        with open(file_path, mode='r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                city_name = row["city"]
                if city_name and search_string.lower() in city_name.lower():
                    cities.append({
                        "city": city_name,
                        "state": row["state_name"],
                        "county": row["county_name"]
                    })
    except FileNotFoundError:
        return JsonResponse({"error": "CSV file not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse(cities, safe=False)