import requests

HASH_TOKEN = 'ZTVneGF3dHc0ZHxaTzlINXpQTHZaNkN5bEI3MGswV0YyMnpXeTNDcEgwQzlUMlRZa1Zo'
APP_ID = 'e5gxawtw4d'
TOKEN_URL = 'https://api.iq.inrix.com/auth/v1/appToken'


def get_token():
    # Pass in the app_id and hash_token as query parameters
    params = {
        'appId': APP_ID,
        'hashToken': HASH_TOKEN
    }
    # Make the request to the INRIX token endpoint
    try:
        response = requests.get(TOKEN_URL, params=params)
        response.raise_for_status()  # Raise HTTPError for bad responses

        data = response.json()
        # Extract the token from the response
        # For more info on how to parse the response, see the json_parser_example.py file
        token = data['result']['token']
        return token, response.status_code

    except requests.exceptions.RequestException as e:
        return f'Request failed with error: {e}', None
    except (KeyError, ValueError) as e:
        return f'Error parsing JSON: {e}', None
