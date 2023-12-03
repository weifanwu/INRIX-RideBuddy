import requests


def get_route(point1, point2, token):
    try:
        params = {
            "wp_1": point1,
            "wp_2": point2,
            "Token": token,
            "format": "json",
            "routeOutputFields": "p"
        }
        TOKEN_URL = "https://api.iq.inrix.com/findRoute"
        response = requests.get(TOKEN_URL, params=params)
        response.raise_for_status()  # Raise HTTPError for bad responses

        data = response.json()
        # Extract the token from the response
        # For more info on how to parse the response, see the json_parser_example.py file
        coordinates = data['result']['trip']['routes'][0]['points']['coordinates']
        return coordinates, response.status_code

    except requests.exceptions.RequestException as e:
        return f'Request failed with error: {e}', None
    except (KeyError, ValueError) as e:
        return f'Error parsing JSON: {e}', None
