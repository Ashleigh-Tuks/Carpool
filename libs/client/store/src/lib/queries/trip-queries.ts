export const LIST_TRIPS = `
  query {
    findAllTrips {
      tripId,
       driver {
        name,
        surname,
        profilePic
      },
      tripDate,
      createdAt,
      coordinates {
        address,
      }
    }
  }
`;

export const UPCOMING_TRIP = `
  query {
    findUpcomingTrip {
      tripId,
      tripDate,
      coordinates {
        address,
      }
    }
  }
`;

export const TRIP_DETAILS = `
  query($id: String!) {
    findTripById(id: $id) {
      tripId,
       driver {
         id,
        name,
        surname,
        profilePic
      },
      tripDate,
      createdAt,
      seatsAvailable,
      price,
      coordinates {
        address,
        latitude
        longitude,
      }
    }
  }
`;
