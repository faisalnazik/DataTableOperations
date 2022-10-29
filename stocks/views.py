from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
import requests
from decouple import config


class StocksList(generics.ListAPIView):

    serializer_class = None

    def load_stocks(self, company):
        url = f"https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol={company}&apikey={config('ALPHA_VANTAGE_API_KEY')}"

        response = requests.get(url)

        if response.status_code == 200:
            """
            SAMPLE RESPONSE
            {
                "Meta Data": {
                    "1. Information": "Weekly Adjusted Prices and Volumes",
                    "2. Symbol": "IBM",
                    "3. Last Refreshed": "2022-10-28",
                    "4. Time Zone": "US/Eastern"
                },
                "Weekly Adjusted Time Series": {
                    "2022-10-28": {
                        "1. open": "130.9000",
                        "2. high": "138.8615",
                        "3. low": "129.8500",
                        "4. close": "138.5100",
                        "5. adjusted close": "138.5100",
                        "6. volume": "26667185",
                        "7. dividend amount": "0.0000"
                    },
                    "2022-10-21": {
                        "1. open": "121.8000",
                        "2. high": "130.8450",
                        "3. low": "121.4300",
                        "4. close": "129.9000",
                        "5. adjusted close": "129.9000",
                        "6. volume": "37309868",
                        "7. dividend amount": "0.0000"
                    }
                }
            }

            """
            data = response.json()
            chart_labels = (
                []
            )  # Keys of the dictionary in Weekly Adjusted Time Series , i.e. 2022-10-28

            chart_data = [
                {"name": "Open", "data": []},
                {"name": "Close", "data": []},
            ]  # [ {"name": "Open", "data": [130.9000, 121.8000]}, {"name": "Close", "data": [138.5100, 129.9000]},  ],

            counter = 0
            for key in data["Weekly Adjusted Time Series"]:
                chart_labels.append(key)
                chart_data[0]["data"].append(
                    data["Weekly Adjusted Time Series"][key]["1. open"]
                )
                chart_data[1]["data"].append(
                    data["Weekly Adjusted Time Series"][key]["4. close"]
                )
                counter += 1
                if counter == 10:
                    break

            return {
                "chartLabels": chart_labels,
                "chartData": chart_data,
            }
        else:
            return None

    def get(self, request):
        company = request.query_params.get("company", None)
        if company is not None:
            data = self.load_stocks(company)
            if data is not None:
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "Error loading stocks"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        return Response({"message": "Something went wrong"}, status=status.HTTP_200_OK)
