
import csv
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def airport_list(request):
    file_path = settings.BASE_DIR / 'assets' / 'usa-airports.csv'
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