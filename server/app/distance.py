"""
Calcuate the lat/long distance between two place
"""
from math import radians, cos, sin, asin, sqrt
from faker import Faker

fake = Faker()

# for _ in range(5):
#     girl_name = fake.name_female()
#     print(girl_name)


def match(start, end):
    DATA = [
    {"start": [37.838704, -122.481604], "end": [37.733287, -122.505842]},
    {"start": [37.834928, -122.486947], "end": [37.731531, -122.505821]},
    {"start": [37.832377, -122.486829], "end": [37.731008, -122.502874]},
    {"start": [37.833149, -122.490616], "end": [37.734781, -122.505750]},
    {"start": [37.828697, -122.488359], "end": [37.734891, -122.503217]},
    {"start": [37.832369, -122.478843], "end": [37.733067, -122.503947]},
    # {"start": [47.661209, -122.344399], "end": [47.674457, -122.434806]},
    # {"start": [47.656852, -122.294701], "end": [47.645394, -122.381810]},
    # {"start": [47.654366, -122.299493], "end": [47.659494, -122.399805]},
    # {"start": [47.661443, -122.316248], "end": [47.671547, -122.420607]},
    # {"start": [47.650354, -122.301386], "end": [47.640615, -122.418407]},
    # {"start": [47.652051, -122.311690], "end": [47.657060, -122.414635]},
    # {"start": [47.648334, -122.305159], "end": [47.641632, -122.423015]},
    # {"start": [47.652037, -122.298697], "end": [47.659684, -122.404000]},
    # {"start": [47.657383, -122.288161], "end": [47.657271, -122.416927]},
    # {"start": [47.650496, -122.306520], "end": [47.657527, -122.407664]},
    # {"start": [47.657246, -122.304190], "end": [47.670145, -122.405994]},
    # {"start": [47.642703, -122.318949], "end": [47.640507, -122.384318]},
    # {"start": [47.649735, -122.306693], "end": [47.657220, -122.382694]},
    # {"start": [47.661009, -122.300261], "end": [47.658127, -122.418008]},
    # {"start": [47.657264, -122.311542], "end": [47.676311, -122.379612]},
    # {"start": [47.634376, -122.293057], "end": [47.641508, -122.388777]},
    # {"start": [47.651871, -122.307533], "end": [47.679000, -122.393140]},
    # {"start": [47.648516, -122.307775], "end": [47.655002, -122.404601]},
    # {"start": [47.641311, -122.274593], "end": [47.665511, -122.386704]},
    # {"start": [47.653304, -122.299763], "end": [47.654580, -122.445605]},
    # {"start": [47.666655, -122.300052], "end": [47.652453, -122.419684]},
    # {"start": [47.652294, -122.306806], "end": [47.659559, -122.408804]},

    {"start": [48.652587, -122.303211], "end": [27.664555, -122.392486]},
    {"start": [47.652587, -121.303211], "end": [47.664555, -124.392486]},
]

    matched_points = []
    post_id = 0
    # print(len(DATA))
    for point in DATA:
        # random create name
        girl_name = fake.name_female()
        distance_start = distance(start[0], point["start"][0], start[1], point["start"][1])
        distance_end = distance(end[0], point["end"][0], end[1], point["end"][1])
        if distance_start <= 3:
            if distance_end <= 3:
                post_id = post_id + 1
                matched_points.append({"post_id": post_id, "start": [point["start"][0], point["start"][1]], "end": [point["end"][0], point["end"][1]], "name": girl_name})
    print("We find " + str(len(matched_points)) + " matched points!")
    return matched_points


# Calculate Distance Between Two Points on Earth
def distance(lat1, lat2, lon1, lon2):

    # The math module contains a function named
    # radians which converts from degrees to radians.
    lon1 = radians(lon1)
    lon2 = radians(lon2)
    lat1 = radians(lat1)
    lat2 = radians(lat2)

    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2

    c = 2 * asin(sqrt(a))

    # Radius of earth in kilometers. Use 3956 for miles
    r = 6371

    # calculate the result
    return(c * r)


# lat1 = 53.32055555555556
# lat2 = 53.31861111111111
# lon1 = -1.7297222222222221
# lon2 =  -1.6997222222222223
# print(distance(lat1, lat2, lon1, lon2), "K.M")
print(match([37.833752, -122.487055], [37.769092, -122.504034]))