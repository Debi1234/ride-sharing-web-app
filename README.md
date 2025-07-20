# Uber Clone API Documentation

## User Registration Endpoint

### POST /users/register

Register a new user in the system.

#### Request Body

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

#### Field Requirements

| Field | Type | Requirements |
|-------|------|--------------|
| fullname.firstname | String | - Required<br>- Minimum 3 characters |
| fullname.lastname | String | - Optional |
| email | String | - Required<br>- Must be valid email format<br>- Must be unique |
| password | String | - Required<br>- Minimum 6 characters |

#### Validation Rules

- Email must be in valid format (e.g., user@domain.com)
- First name must be at least 3 characters long
- Password must be at least 6 characters long
- All required fields must be present

#### Response

##### Success Response (201 Created)

```json
{
    "token": "jwt_token_here",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null,
        "createdAt": "2024-03-14T12:00:00.000Z",
        "updatedAt": "2024-03-14T12:00:00.000Z",
        "_id": "user_id_here"
    }
}
```

##### Error Response (400 Bad Request)

```json
{
    "errors": [
        {
            "msg": "Please enter a valid email",
            "param": "email",
            "location": "body"
        }
    ]
}
```

#### Notes

- The password is automatically hashed before storage
- The response includes a JWT token for authentication
- The user's password is not included in the response
- Email addresses are stored in lowercase format 

## User Login Endpoint

### POST /users/login

Authenticate a user and get access token.

#### Request Body

```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

#### Field Requirements

| Field | Type | Requirements |
|-------|------|--------------|
| email | String | - Required<br>- Must be valid email format |
| password | String | - Required<br>- Minimum 6 characters |

#### Validation Rules

- Email must be in valid format (e.g., user@domain.com)
- Password must be at least 6 characters long
- All required fields must be present

#### Response

##### Success Response (200 OK)

```json
{
    "token": "jwt_token_here",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null,
        "createdAt": "2024-03-14T12:00:00.000Z",
        "updatedAt": "2024-03-14T12:00:00.000Z",
        "_id": "user_id_here"
    }
}
```

##### Error Responses

###### Invalid Credentials (400 Bad Request)
```json
{
    "message": "Invalid password"
}
```

###### User Not Found (400 Bad Request)
```json
{
    "message": "User not found"
}
```

###### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Please enter a valid email",
            "param": "email",
            "location": "body"
        }
    ]
}
```

#### Notes

- The endpoint validates both email and password
- On successful login, returns a JWT token for authentication
- The user's password is not included in the response
- Email addresses are matched case-insensitively 

## User Profile Endpoint

### GET /users/profile

Get the authenticated user's profile information.

#### Authentication Required
- Bearer token in Authorization header or token in cookies

#### Response

##### Success Response (200 OK)

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "createdAt": "2024-03-14T12:00:00.000Z",
    "updatedAt": "2024-03-14T12:00:00.000Z",
    "_id": "user_id_here"
}
```

##### Error Response (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

#### Notes
- Requires valid authentication token
- Returns user profile without password field
- Token must not be blacklisted

## User Logout Endpoint

### GET /users/logout

Logout the authenticated user and invalidate their token.

#### Authentication Required
- Bearer token in Authorization header or token in cookies

#### Response

##### Success Response (200 OK)
```json
{
    "message": "Logged out successfully"
}
```

##### Error Responses

###### No Token Found (400 Bad Request)
```json
{
    "message": "No token found"
}
```

###### Unauthorized (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

#### Notes
- Invalidates the current token by adding it to blacklist
- Token remains in blacklist for 24 hours
- Clears the authentication cookie if present
- Requires valid authentication token 

## Captain Registration Endpoint

### POST /captain/register

Register a new captain in the system.

#### Request Body

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

#### Field Requirements

| Field | Type | Requirements |
|-------|------|--------------|
| fullname.firstname | String | - Required<br>- Minimum 3 characters |
| fullname.lastname | String | - Optional |
| email | String | - Required<br>- Must be valid email format<br>- Must be unique |
| password | String | - Required<br>- Minimum 6 characters |
| vehicle.color | String | - Required<br>- Minimum 3 characters |
| vehicle.plate | String | - Required<br>- Minimum 3 characters<br>- Must be unique |
| vehicle.capacity | Number | - Required<br>- Must be at least 1 |
| vehicle.vehicleType | String | - Required<br>- Must be one of: "car", "motorcycle", "auto" |

#### Validation Rules

- Email must be in valid format
- First name must be at least 3 characters long
- Password must be at least 6 characters long
- Vehicle color must be at least 3 characters long
- Vehicle plate must be at least 3 characters long
- Vehicle capacity must be a number
- Vehicle type must be one of the allowed types
- All required fields must be present

#### Response

##### Success Response (201 Created)

```json
{
    "token": "jwt_token_here",
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "status": "active",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "location": {
            "lat": null,
            "lng": null
        },
        "socketId": null,
        "createdAt": "2024-03-14T12:00:00.000Z",
        "updatedAt": "2024-03-14T12:00:00.000Z",
        "_id": "captain_id_here"
    }
}
```

##### Error Response (400 Bad Request)

```json
{
    "errors": [
        {
            "msg": "Please enter a valid email",
            "param": "email",
            "location": "body"
        }
    ]
}
```

#### Notes

- The password is automatically hashed before storage
- The response includes a JWT token for authentication
- The captain's password is not included in the response
- Email addresses are stored in lowercase format
- Vehicle plate numbers must be unique across all captains

## Captain Login Endpoint

### POST /captain/login

Authenticate a captain and get access token.

#### Request Body

```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

#### Field Requirements

| Field | Type | Requirements |
|-------|------|--------------|
| email | String | - Required<br>- Must be valid email format |
| password | String | - Required<br>- Minimum 6 characters |

#### Validation Rules

- Email must be in valid format
- Password must be at least 6 characters long
- All required fields must be present

#### Response

##### Success Response (200 OK)

```json
{
    "success": true,
    "token": "jwt_token_here",
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "status": "active",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "location": {
            "lat": null,
            "lng": null
        },
        "socketId": null,
        "createdAt": "2024-03-14T12:00:00.000Z",
        "updatedAt": "2024-03-14T12:00:00.000Z",
        "_id": "captain_id_here"
    }
}
```

##### Error Responses

###### Invalid Credentials (400 Bad Request)
```json
{
    "success": false,
    "message": "Invalid password"
}
```

###### Captain Not Found (400 Bad Request)
```json
{
    "success": false,
    "message": "Captain not found"
}
```

###### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Please enter a valid email",
            "param": "email",
            "location": "body"
        }
    ]
}
```

#### Notes

- The endpoint validates both email and password
- On successful login, returns a JWT token for authentication
- The captain's password is not included in the response
- Email addresses are matched case-insensitively
- Sets the token in an HTTP-only cookie

## Captain Profile Endpoint

### GET /captain/profile

Get the authenticated captain's profile information.

#### Authentication Required
- Bearer token in Authorization header or token in cookies

#### Response

##### Success Response (200 OK)

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "active",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    },
    "location": {
        "lat": null,
        "lng": null
    },
    "socketId": null,
    "createdAt": "2024-03-14T12:00:00.000Z",
    "updatedAt": "2024-03-14T12:00:00.000Z",
    "_id": "captain_id_here"
}
```

##### Error Response (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

#### Notes
- Requires valid authentication token
- Returns captain profile without password field
- Token must not be blacklisted

## Captain Logout Endpoint

### GET /captain/logout

Logout the authenticated captain and invalidate their token.

#### Authentication Required
- Bearer token in Authorization header or token in cookies

#### Response

##### Success Response (200 OK)
```json
{
    "message": "Logged out successfully"
}
```

##### Error Responses

###### No Token Found (400 Bad Request)
```json
{
    "message": "No token found"
}
```

###### Unauthorized (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

#### Notes
- Invalidates the current token by adding it to blacklist
- Token remains in blacklist for 24 hours
- Clears the authentication cookie if present
- Requires valid authentication token 

## Ride Creation Endpoint

### POST /ride/create

Create a new ride request.

#### Authentication Required
- Bearer token in Authorization header or token in cookies

#### Request Body

```json
{
    "pickup": "123 Main Street, New York, NY",
    "destination": "456 Broadway, New York, NY",
    "vehicleType": "car"
}
```

#### Field Requirements

| Field | Type | Requirements |
|-------|------|--------------|
| pickup | String | - Required<br>- Must not be empty |
| destination | String | - Required<br>- Must not be empty |
| vehicleType | String | - Required<br>- Must be one of: "car", "auto", "moto" |

#### Validation Rules

- Pickup location must be provided
- Destination must be provided
- Vehicle type must be one of the allowed types
- All required fields must be present

#### Response

##### Success Response (201 Created)

```json
{
    "user": "user_id_here",
    "pickup": "123 Main Street, New York, NY",
    "destination": "456 Broadway, New York, NY",
    "vehicleType": "car",
    "status": "pending",
    "createdAt": "2024-03-14T12:00:00.000Z",
    "updatedAt": "2024-03-14T12:00:00.000Z",
    "_id": "ride_id_here"
}
```

##### Error Responses

###### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Pickup location is required",
            "param": "pickup",
            "location": "body"
        }
    ]
}
```

###### Unauthorized (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

###### Server Error (500 Internal Server Error)
```json
{
    "message": "Failed to create ride"
}
```

#### Notes
- Requires valid user authentication token
- Automatically associates the ride with the authenticated user
- Ride status is set to "pending" by default
- Vehicle type must match the available options in the system

## Ride Fare Calculation Endpoint

### GET /ride/get-fare

Calculate the fare for a ride based on pickup and destination locations.

#### Authentication Required
- Bearer token in Authorization header or token in cookies

#### Query Parameters

| Parameter | Type | Requirements |
|-----------|------|--------------|
| pickup | String | - Required<br>- Must not be empty |
| destination | String | - Required<br>- Must not be empty |

#### Validation Rules

- Pickup location must be provided
- Destination must be provided
- Both parameters must be provided as query parameters

#### Response

##### Success Response (200 OK)

```json
{
    "fare": 193.20,
    "distance": "2.5 km",
    "duration": "8 mins"
}
```

##### Error Responses

###### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Pickup location is required",
            "param": "pickup",
            "location": "query"
        }
    ]
}
```

###### Unauthorized (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

###### Server Error (500 Internal Server Error)
```json
{
    "message": "Failed to calculate fare"
}
```

#### Notes
- Requires valid user authentication token
- Uses external mapping service to calculate distance and time
- Fare calculation is based on distance and time factors
- Returns fare amount in the system's currency

## Ride Confirmation Endpoint

### POST /ride/confirm

Confirm a ride request by a captain.

#### Authentication Required
- Bearer token in Authorization header or token in cookies (Captain authentication)

#### Request Body

```json
{
    "rideId": "ride_id_here"
}
```

#### Field Requirements

| Field | Type | Requirements |
|-------|------|--------------|
| rideId | String | - Required<br>- Must be valid MongoDB ObjectId |

#### Validation Rules

- Ride ID must be a valid MongoDB ObjectId
- Captain must be authenticated
- Ride must be in "pending" status

#### Response

##### Success Response (200 OK)

```json
{
    "message": "Ride confirmed successfully",
    "ride": {
        "user": "user_id_here",
        "captain": "captain_id_here",
        "pickup": "123 Main Street, New York, NY",
        "destination": "456 Broadway, New York, NY",
        "vehicleType": "car",
        "status": "confirmed",
        "fare": 193.20,
        "otp": "1234",
        "createdAt": "2024-03-14T12:00:00.000Z",
        "updatedAt": "2024-03-14T12:00:00.000Z",
        "_id": "ride_id_here"
    }
}
```

##### Error Responses

###### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Invalid ride id",
            "param": "rideId",
            "location": "body"
        }
    ]
}
```

###### Unauthorized (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

###### Ride Not Found (404 Not Found)
```json
{
    "message": "Ride not found"
}
```

###### Ride Already Confirmed (400 Bad Request)
```json
{
    "message": "Ride is already confirmed"
}
```

#### Notes
- Requires valid captain authentication token
- Generates a unique OTP for ride verification
- Updates ride status to "confirmed"
- Associates the captain with the ride
- Emits socket events for real-time updates

## Ride Start Endpoint

### GET /ride/start-ride

Start a confirmed ride by verifying OTP.

#### Authentication Required
- Bearer token in Authorization header or token in cookies (Captain authentication)

#### Query Parameters

| Parameter | Type | Requirements |
|-----------|------|--------------|
| rideId | String | - Required<br>- Must be valid MongoDB ObjectId |
| otp | String | - Required<br>- Must be 4-6 characters long |

#### Validation Rules

- Ride ID must be a valid MongoDB ObjectId
- OTP must be between 4-6 characters
- Captain must be authenticated
- Ride must be in "confirmed" status
- OTP must match the ride's OTP

#### Response

##### Success Response (200 OK)

```json
{
    "message": "Ride started successfully",
    "ride": {
        "user": "user_id_here",
        "captain": "captain_id_here",
        "pickup": "123 Main Street, New York, NY",
        "destination": "456 Broadway, New York, NY",
        "vehicleType": "car",
        "status": "started",
        "fare": 193.20,
        "otp": "1234",
        "startTime": "2024-03-14T12:00:00.000Z",
        "createdAt": "2024-03-14T12:00:00.000Z",
        "updatedAt": "2024-03-14T12:00:00.000Z",
        "_id": "ride_id_here"
    }
}
```

##### Error Responses

###### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Invalid ride id",
            "param": "rideId",
            "location": "query"
        }
    ]
}
```

###### Unauthorized (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

###### Invalid OTP (400 Bad Request)
```json
{
    "message": "Invalid OTP"
}
```

###### Ride Not Found (404 Not Found)
```json
{
    "message": "Ride not found"
}
```

###### Ride Not Confirmed (400 Bad Request)
```json
{
    "message": "Ride is not confirmed"
}
```

#### Notes
- Requires valid captain authentication token
- Verifies OTP before starting the ride
- Updates ride status to "started"
- Records start time of the ride
- Emits socket events for real-time updates

## Ride End Endpoint

### POST /ride/end-ride

End a started ride.

#### Authentication Required
- Bearer token in Authorization header or token in cookies (Captain authentication)

#### Request Body

```json
{
    "rideId": "ride_id_here"
}
```

#### Field Requirements

| Field | Type | Requirements |
|-------|------|--------------|
| rideId | String | - Required<br>- Must be valid MongoDB ObjectId |

#### Validation Rules

- Ride ID must be a valid MongoDB ObjectId
- Captain must be authenticated
- Ride must be in "started" status

#### Response

##### Success Response (200 OK)

```json
{
    "message": "Ride ended successfully",
    "ride": {
        "user": "user_id_here",
        "captain": "captain_id_here",
        "pickup": "123 Main Street, New York, NY",
        "destination": "456 Broadway, New York, NY",
        "vehicleType": "car",
        "status": "completed",
        "fare": 193.20,
        "otp": "1234",
        "startTime": "2024-03-14T12:00:00.000Z",
        "endTime": "2024-03-14T12:15:00.000Z",
        "createdAt": "2024-03-14T12:00:00.000Z",
        "updatedAt": "2024-03-14T12:15:00.000Z",
        "_id": "ride_id_here"
    }
}
```

##### Error Responses

###### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Invalid ride id",
            "param": "rideId",
            "location": "body"
        }
    ]
}
```

###### Unauthorized (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

###### Ride Not Found (404 Not Found)
```json
{
    "message": "Ride not found"
}
```

###### Ride Not Started (400 Bad Request)
```json
{
    "message": "Ride is not started"
}
```

#### Notes
- Requires valid captain authentication token
- Updates ride status to "completed"
- Records end time of the ride
- Calculates final ride duration
- Emits socket events for real-time updates
- Captain can now accept new rides

## Maps Endpoints

### GET /maps/get-coordinates

Get coordinates (latitude and longitude) for a given address.

#### Authentication Required
- Bearer token in Authorization header or token in cookies

#### Query Parameters

| Parameter | Type | Requirements |
|-----------|------|--------------|
| address | String | - Required<br>- Minimum 3 characters |

#### Validation Rules

- Address must be a string with at least 3 characters
- Address must be provided as a query parameter

#### Response

##### Success Response (200 OK)

```json
{
    "coordinates": {
        "lat": 40.7128,
        "lng": -74.0060
    }
}
```

##### Error Responses

###### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Invalid value",
            "param": "address",
            "location": "query"
        }
    ]
}
```

###### Unauthorized (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

###### Server Error (500 Internal Server Error)
```json
{
    "message": "Failed to get coordinates"
}
```

#### Notes
- Requires valid authentication token
- Uses external mapping service to geocode addresses
- Returns latitude and longitude coordinates

### GET /maps/get-dist-time

Get distance and travel time between two locations.

#### Authentication Required
- Bearer token in Authorization header or token in cookies

#### Query Parameters

| Parameter | Type | Requirements |
|-----------|------|--------------|
| origin | String | - Required<br>- Minimum 3 characters |
| destination | String | - Required<br>- Minimum 3 characters |

#### Validation Rules

- Origin must be a string with at least 3 characters
- Destination must be a string with at least 3 characters
- Both parameters must be provided as query parameters

#### Response

##### Success Response (200 OK)

```json
{
    "distance": "2.5 km",
    "duration": "8 mins",
    "distanceValue": 2500,
    "durationValue": 480
}
```

##### Error Responses

###### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Invalid value",
            "param": "origin",
            "location": "query"
        }
    ]
}
```

###### Unauthorized (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

###### Server Error (500 Internal Server Error)
```json
{
    "message": "Failed to get distance and time"
}
```

#### Notes
- Requires valid authentication token
- Uses external mapping service to calculate route information
- Returns both formatted strings and numeric values for distance and duration

### GET /maps/get-suggestions

Get location suggestions based on user input.

#### Authentication Required
- Bearer token in Authorization header or token in cookies

#### Query Parameters

| Parameter | Type | Requirements |
|-----------|------|--------------|
| input | String | - Required<br>- Minimum 3 characters |

#### Validation Rules

- Input must be a string with at least 3 characters
- Input must be provided as a query parameter

#### Response

##### Success Response (200 OK)

```json
{
    "suggestions": [
        "123 Main Street, New York, NY",
        "123 Main Street, Brooklyn, NY",
        "123 Main Street, Queens, NY"
    ]
}
```

##### Error Responses

###### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Invalid value",
            "param": "input",
            "location": "query"
        }
    ]
}
```

###### Unauthorized (401 Unauthorized)
```json
{
    "message": "Unauthorized: No token provided"
}
```

###### Server Error (500 Internal Server Error)
```json
{
    "message": "Failed to get suggestions"
}
```

#### Notes
- Requires valid authentication token
- Uses external mapping service for autocomplete functionality
- Returns an array of location suggestions based on the input
- Useful for implementing address autocomplete in the frontend