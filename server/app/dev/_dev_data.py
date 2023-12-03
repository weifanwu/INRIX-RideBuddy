from faker import Faker
import random

fake = Faker()

USERS = []
for i in range(1, 21):
    user = {
        "id": i,
        "name": fake.name(),
        "email": fake.email(),
        "password": fake.password(),
        "gender": random.choice(["Male", "Female", "Other"]),
        "age": random.randint(18, 70),
        "city": fake.city(),
        "occupation": fake.job()
    }
    USERS.append(user)

MESSAGES = []
num_messages = 50

for i in range(1, num_messages + 1):
    sender_id = random.randint(1, 20)
    receiver_id = random.randint(1, 20)
    message = {
        "id": i,
        "text": fake.sentence(),
        "send_time": fake.date_time_between(start_date="-2y", end_date="now").strftime("%Y-%m-%d %H:%M:%S"),
        "sender_id": sender_id,
        "receiver_id": receiver_id
    }
    MESSAGES.append(message)

RIDERS = []
num_riders = 30  # Number of riders to generate


def generate_coord(lat_min, lat_max, lon_min, lon_max):
    """Generate a random latitude and longitude within specified bounds."""
    lat = random.uniform(lat_min, lat_max)
    lon = random.uniform(lon_min, lon_max)
    return lat, lon


for i in range(1, num_riders + 1):
    start_lat, start_lon = generate_coord(47.4957, 47.7341, -122.4359, -122.2359)
    end_lat, end_lon = generate_coord(47.4957, 47.7341, -122.4359, -122.2359)

    rider = {
        "id": i,
        "start_lon": start_lon,
        "start_lat": start_lat,
        "end_lon": end_lon,
        "end_lat": end_lat,
        "content": fake.text(),
        "time": fake.date_time_this_year().strftime("%Y-%m-%d %H:%M:%S"),
        "user_id": random.randint(1, 20)  # Assuming user IDs range from 1 to 20
    }
    RIDERS.append(rider)
