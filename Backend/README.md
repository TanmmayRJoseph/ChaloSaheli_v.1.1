# 🚖 Chalo-Saheli – Express Backend

## Introduction

This project is a backend service for a women-only ride-hailing application, built using **Express.js**. It provides a secure and efficient API to facilitate ride booking, driver management, and trip tracking, ensuring a safe commuting experience for female passengers. The backend handles authentication, ride requests, payments, and real-time trip updates. Designed with **scalability and security** in mind, this project is the foundation for a full-fledged ride-hailing platform tailored for women’s safety and convenience.

## 🚀 Features

- **User Authentication** – Secure sign-up/login for passengers and drivers.
- **Ride Booking** – Users can request rides, and nearby drivers receive notifications.
- **Real-time Trip Updates** – Live status updates for ongoing rides.
- **Driver Management** – Registration and verification for female drivers.


## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB 
- **Authentication**: JWT, bcrypt  
- **Real-time Updates**: Socket.io 
 ---

### **Saheli Registration**
#### `POST /saheli/register`
Registers a new Saheli (female user/driver) and generates an authentication token.

##### **Request Body** (JSON)
```json
{
  "name": "Emma Watson",
  "phoneNo": "+919876543210",
  "gender": "Female",
  "emergencyNo": "+911234567890",
  "dob": "1995-05-20",
  "emailId": "jane@example.com",
  "address": "123, Street Name, City",
  "password": "securepassword123"
}
```
---
### **Saheli Login**
#### `POST /saheli/login`
Authenticates an existing Saheli user and returns a JWT token.

##### **Request Body** (JSON)
```json
{
  "emailId": "jane@example.com",
  "password": "securepassword123"
}
```
---

### **Saarthi Registration**
#### `POST /saarthi/register`
Registers a new Saarthi (female driver) and generates an authentication token.

##### **Request Body** (JSON)
```json
{
  "name": "Ayesha Khan",
  "phoneNo": "+919876543210",
  "gender": "Female",
  "vechile": "Sedan",
  "dob": "1992-08-15",
  "emailId": "ayesha@example.com",
  "city": "Mumbai",
  "password": "securepassword123"
}
```
---
### **Get Coordinates**
#### `GET /maps/getCoordinates`
Fetches geographical coordinates (latitude and longitude) based on a given address.

##### **Headers**
- `Authorization`: Bearer `<JWT Token>` (Required for authentication)

##### **Request Body** (JSON)
```json
{
  "address": "123, MG Road, Mumbai, India"
}
```
#### Response
```json
{
  "coordinates": {
    "latitude": 19.076,
    "longitude": 72.8777
  }
}
```
### **Get Auto-Complete Address Suggestions**
#### `GET /maps/getAutoCompleteSuggestions`
Fetches auto-complete address suggestions based on a partial address input.

##### **Headers**
- `Authorization`: Bearer `<JWT Token>` (Required for authentication)

##### **Query Parameters**
| Parameter  | Type   | Required | Description                           |
|------------|--------|----------|---------------------------------------|
| `address`  | string | Yes      | Partial address input for suggestions |

##### **Example Request**
```http
GET /maps/getAutoCompleteSuggestions?address=MG%20Road
```
#### Response
```json
{
  "suggestions": [
    "MG Road, Mumbai, Maharashtra, India",
    "MG Road, Pune, Maharashtra, India",
    "MG Road, Bengaluru, Karnataka, India"
  ]
}
```
---
### **Get Distance and Estimated Time**
#### `GET /maps/getDistanceTimes`
Calculates the distance and estimated travel time between two locations.

##### **Request Body** (JSON)
```json
{
  "origin": "Mumbai, India",
  "destination": "Pune, India"
}
```
#### Response
```json
{
  "distanceTime": {
    "distance": "150 km",
    "estimatedTime": "3 hours"
  }
}
```
---