# Uber Clone Frontend Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Pages Documentation](#pages-documentation)
6. [Components Documentation](#components-documentation)
7. [Context Providers](#context-providers)
8. [Services](#services)
9. [Styling & UI](#styling--ui)
10. [State Management](#state-management)
11. [Routing](#routing)
12. [Real-time Features](#real-time-features)
13. [API Integration](#api-integration)

## Project Overview

The Uber Clone Frontend is a React-based web application that provides a complete ride-sharing experience. It includes separate interfaces for users (passengers) and captains (drivers), with real-time features, location services, and a modern UI design.

### Key Features
- **Dual User Interface**: Separate flows for passengers and drivers
- **Real-time Tracking**: Live location updates and ride status
- **Location Services**: Address autocomplete and route calculation
- **Authentication**: Secure login/signup for both user types
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Socket Integration**: Real-time communication with backend

## Technology Stack

### Core Technologies
- **React 19.1.0**: Modern React with hooks and functional components
- **Vite 6.3.5**: Fast build tool and development server
- **React Router DOM 7.6.2**: Client-side routing

### UI & Styling
- **Tailwind CSS 4.1.10**: Utility-first CSS framework
- **PostCSS 8.5.5**: CSS processing
- **Autoprefixer 10.4.21**: CSS vendor prefixing

### External Services
- **Google Maps API**: Location services and mapping
- **Socket.io Client 4.8.1**: Real-time communication
- **Axios 1.10.0**: HTTP client for API calls

### Development Tools
- **ESLint 9.25.0**: Code linting and formatting
- **TypeScript Types**: Type definitions for React

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static files
│   ├── components/        # Reusable UI components
│   ├── context/          # React Context providers
│   ├── pages/            # Page components
│   ├── services/         # API and external services
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   ├── index.css         # Global styles
│   └── App.css           # App-specific styles
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uber/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_BASE_URL=http://localhost:5000
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Pages Documentation

### User Pages

#### Start Page (`/`)
**File**: `src/pages/Start.jsx`

The landing page of the application with a professional design.

**Features**:
- Hero section with Uber branding
- Gradient overlays and modern typography
- Call-to-action button to continue to login
- Floating animated elements
- Responsive design

**Key Components**:
- Background image with overlay
- Brand logo and tagline
- Feature highlights (Fast, Safe, Affordable)
- Professional CTA button

#### User Login (`/login`)
**File**: `src/pages/UserLogin.jsx`

Authentication page for passengers.

**Features**:
- Email and password authentication
- Form validation
- Error handling
- Navigation to signup
- Responsive design

#### User Signup (`/signup`)
**File**: `src/pages/UserSignup.jsx`

Registration page for new passengers.

**Features**:
- User registration form
- Real-time validation
- Password confirmation
- Terms and conditions
- Navigation to login

#### Home Page (`/home`)
**File**: `src/pages/Home.jsx`

Main interface for passengers to book rides.

**Features**:
- Interactive map integration
- Location input with autocomplete
- Vehicle type selection
- Real-time ride tracking
- Dynamic layout adjustments

**Key Components**:
- LiveTracking map component
- Locationpanel for address suggestions
- VehicleOptionsPanel for ride selection
- WaitingForDriver for ride status

#### Riding Page (`/riding`)
**File**: `src/pages/Riding.jsx`

Active ride interface for passengers.

**Features**:
- Live ride tracking
- Driver and vehicle information
- Ride progress indicators
- Payment options
- Real-time status updates

#### User Logout (`/logout`)
**File**: `src/pages/UserLogout.jsx`

Logout functionality for passengers.

### Captain Pages

#### Captain Login (`/captain/login`)
**File**: `src/pages/CaptainLogin.jsx`

Authentication page for drivers.

**Features**:
- Captain-specific login
- Form validation
- Error handling
- Navigation to signup

#### Captain Signup (`/captain/signup`)
**File**: `src/pages/CaptainSignup.jsx`

Registration page for new drivers.

**Features**:
- Comprehensive registration form
- Vehicle information collection
- Document upload capabilities
- Validation and error handling

#### Captain Home (`/captain-home`)
**File**: `src/pages/CaptainHome.jsx`

Main interface for drivers to accept rides.

**Features**:
- Available ride requests
- Driver status management
- Ride acceptance interface
- Real-time notifications

#### Captain Riding (`/captain-riding`)
**File**: `src/pages/CaptainRiding.jsx`

Active ride interface for drivers.

**Features**:
- Ride navigation
- Passenger information
- OTP verification
- Ride completion

#### Captain Logout (`/captain/logout`)
**File**: `src/pages/CaptainLogout.jsx`

Logout functionality for drivers.

### Protection Wrappers

#### UserProtectWrapper
**File**: `src/pages/UserProtectWrapper.jsx`

Route protection for authenticated users.

**Features**:
- Authentication verification
- Token validation
- Redirect to login if unauthorized
- User context integration

#### CaptainProtectWrapper
**File**: `src/pages/CaptainProtectWrapper.jsx`

Route protection for authenticated captains.

**Features**:
- Captain authentication verification
- Token validation
- Redirect to login if unauthorized
- Captain context integration

## Components Documentation

### Core Components

#### LiveTracking
**File**: `src/components/LiveTracking.jsx`

Google Maps integration component for real-time location tracking.

**Props**:
- `mapHeight` (string): Height of the map container

**Features**:
- Google Maps API integration
- Real-time location updates
- Custom map styling
- Responsive design

#### Locationpanel
**File**: `src/components/Locationpanel.jsx`

Address autocomplete and suggestion component.

**Props**:
- `onLocationSelect` (function): Callback for location selection
- `inputValue` (string): Current input value

**Features**:
- Address suggestions from API
- Debounced search
- Loading states
- Professional UI design
- Empty state handling

#### VehicleOptionsPanel
**File**: `src/components/VehicleOptionsPanel.jsx`

Vehicle type selection interface.

**Props**:
- `onBack` (function): Back navigation handler
- `pickup` (string): Pickup location
- `destination` (string): Destination location

**Features**:
- Vehicle type options (Car, Auto, Motorcycle)
- Fare calculation
- Ride booking functionality
- Professional card design

### Ride Management Components

#### WaitingForDriver
**File**: `src/components/WaitingForDriver.jsx`

Interface shown while waiting for driver confirmation.

**Props**:
- `onBack` (function): Back navigation handler
- `rideData` (object): Ride information

**Features**:
- Driver and vehicle details
- Ride information display
- OTP display
- Professional card layout

#### FinishRide
**File**: `src/components/FinishRide.jsx`

Ride completion interface for drivers.

**Props**:
- Ride data from location state

**Features**:
- Ride summary display
- Passenger information
- Fare calculation
- Ride completion actions

#### LookingForDrivers
**File**: `src/components/LookingForDrivers.jsx`

Loading interface while searching for drivers.

**Features**:
- Animated loading indicators
- Status messages
- Professional design

### Popup Components

#### RidePopUp
**File**: `src/components/RidePopUp.jsx`

Ride request popup for drivers.

**Features**:
- Ride details display
- Accept/reject actions
- Professional modal design

#### ConfirmRidePopUp
**File**: `src/components/ConfirmRidePopUp.jsx`

Ride confirmation popup.

**Features**:
- Ride confirmation details
- Action buttons
- Modal interface

#### ConfirmRide
**File**: `src/components/ConfirmRide.jsx`

Ride confirmation interface.

**Features**:
- Ride details review
- Confirmation actions
- Professional layout

### Information Components

#### CaptainDetails
**File**: `src/components/CaptainDetails.jsx`

Driver information display component.

**Features**:
- Driver profile information
- Vehicle details
- Contact options
- Professional card design

## Context Providers

### UserContext
**File**: `src/context/UserContext.jsx`

Global state management for user data.

**Features**:
- User authentication state
- User profile data
- Login/logout functionality
- Token management

**Context Value**:
```javascript
{
  user: userData,
  login: loginFunction,
  logout: logoutFunction,
  loading: boolean
}
```

### CaptainContext
**File**: `src/context/CaptainContext.jsx`

Global state management for captain data.

**Features**:
- Captain authentication state
- Captain profile data
- Vehicle information
- Status management

**Context Value**:
```javascript
{
  captain: captainData,
  login: loginFunction,
  logout: logoutFunction,
  loading: boolean
}
```

### SocketContext
**File**: `src/context/SocketContext.jsx`

Socket.io connection management.

**Features**:
- Socket connection establishment
- Real-time event handling
- Connection status management
- Event emission utilities

**Context Value**:
```javascript
{
  socket: socketInstance,
  isConnected: boolean,
  connect: connectFunction,
  disconnect: disconnectFunction
}
```

## Services

### API Service
**File**: `src/services/api.js`

Centralized API communication service.

**Features**:
- Axios instance configuration
- Request/response interceptors
- Authentication token handling
- Error handling

**Key Methods**:
- `getSuggestions(input)` - Get location suggestions
- `getCoordinates(address)` - Get location coordinates
- `getDistanceTime(origin, destination)` - Calculate route info
- `createRide(rideData)` - Create new ride
- `getFare(pickup, destination)` - Calculate fare
- `confirmRide(rideId)` - Confirm ride (captain)
- `startRide(rideId, otp)` - Start ride (captain)
- `endRide(rideId)` - End ride (captain)

## Styling & UI

### Design System
The application uses Tailwind CSS for styling with a consistent design system:

**Colors**:
- Primary: Blue (`blue-500`, `blue-600`)
- Success: Green (`green-500`, `green-600`)
- Warning: Yellow (`yellow-500`)
- Error: Red (`red-500`, `red-600`)
- Neutral: Gray scale (`gray-50` to `gray-900`)

**Typography**:
- Headings: `font-bold`, `text-2xl` to `text-6xl`
- Body: `text-sm`, `text-base`, `text-lg`
- Captions: `text-xs`

**Spacing**:
- Consistent padding: `p-4`, `p-6`
- Margins: `mb-4`, `mb-6`, `mt-4`
- Gaps: `space-x-3`, `space-y-4`

**Components**:
- Cards: `rounded-xl`, `shadow-lg`
- Buttons: `rounded-xl`, `py-3`, `px-4`
- Inputs: `rounded-lg`, `border`, `focus:ring`

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Flexible layouts with `flex` and `grid`
- Adaptive typography and spacing

## State Management

### Context API
The application uses React Context API for global state management:

1. **UserContext**: Manages user authentication and profile
2. **CaptainContext**: Manages captain authentication and profile
3. **SocketContext**: Manages real-time connections

### Local State
Components use React hooks for local state management:
- `useState` for component state
- `useEffect` for side effects
- `useCallback` for memoized functions
- `useNavigate` for routing

### State Flow
1. **Authentication**: Context providers manage auth state
2. **Ride Flow**: Local state with context updates
3. **Real-time**: Socket context for live updates
4. **UI State**: Local component state for interactions

## Routing

### Route Structure
The application uses React Router DOM for client-side routing:

**Public Routes**:
- `/` - Start page
- `/login` - User login
- `/signup` - User signup
- `/captain/login` - Captain login
- `/captain/signup` - Captain signup

**Protected User Routes**:
- `/home` - User home (protected by UserProtectWrapper)
- `/riding` - Active ride (protected by UserProtectWrapper)
- `/logout` - User logout (protected by UserProtectWrapper)

**Protected Captain Routes**:
- `/captain-home` - Captain home (protected by CaptainProtectWrapper)
- `/captain-riding` - Active ride (protected by CaptainProtectWrapper)
- `/captain/logout` - Captain logout (protected by CaptainProtectWrapper)

### Route Protection
- **UserProtectWrapper**: Verifies user authentication
- **CaptainProtectWrapper**: Verifies captain authentication
- Automatic redirects to login if unauthorized
- Token validation on route access

## Real-time Features

### Socket.io Integration
The application uses Socket.io for real-time communication:

**Connection Management**:
- Automatic connection on app start
- Reconnection handling
- Connection status monitoring

**Real-time Events**:
- `join` - User/captain joins socket room
- `joined` - Confirmation of successful join
- `ride-confirmed` - Ride confirmation notification
- `ride-started` - Ride start notification
- `ride-ended` - Ride completion notification

**Event Handling**:
- Real-time ride status updates
- Live location tracking
- Instant notifications
- Automatic UI updates

### Real-time Components
- **LiveTracking**: Real-time map updates
- **WaitingForDriver**: Live ride status
- **Riding**: Active ride tracking
- **CaptainHome**: Live ride requests

## API Integration

### Authentication Flow
1. **Login**: POST request with credentials
2. **Token Storage**: JWT token stored in localStorage
3. **Request Headers**: Token included in Authorization header
4. **Token Refresh**: Automatic token validation

### Ride Flow
1. **Location Selection**: Address autocomplete and validation
2. **Fare Calculation**: Distance and time calculation
3. **Ride Creation**: POST request to create ride
4. **Real-time Updates**: Socket events for status changes
5. **Ride Completion**: Final status update

### Error Handling
- **Network Errors**: Axios interceptors for global error handling
- **Validation Errors**: Form-level error display
- **Authentication Errors**: Automatic logout on token expiry
- **User Feedback**: Toast notifications and error messages

### API Endpoints
All API calls are centralized in the `api.js` service:
- Base URL configuration
- Request/response interceptors
- Error handling
- Authentication headers

## Complete API Requests & Socket Events

### Axios HTTP Requests

#### Authentication Requests

**User Login**
```javascript
POST ${VITE_BASE_URL}/users/login
Body: { email, password }
Response: { user, token }
```

**User Registration**
```javascript
POST ${VITE_BASE_URL}/users/register
Body: { 
  fullname: { firstname, lastname }, 
  email, 
  password 
}
Response: { user, token }
```

**Captain Login**
```javascript
POST ${VITE_BASE_URL}/captain/login
Body: { email, password }
Response: { captain, token }
```

**Captain Registration**
```javascript
POST ${VITE_BASE_URL}/captain/register
Body: { 
  fullname: { firstname, lastname }, 
  email, 
  password,
  vehicle: { color, plate, capacity, vehicleType }
}
Response: { captain, token }
```

**User Profile Fetch**
```javascript
GET ${VITE_BASE_URL}/users/profile
Headers: { authorization: `Bearer ${token}` }
Response: { user data }
```

**Captain Profile Fetch**
```javascript
GET ${VITE_BASE_URL}/captain/profile
Headers: { authorization: `Bearer ${token}` }
Response: { captain data }
```

**User Logout**
```javascript
GET ${VITE_BASE_URL}/users/logout
Headers: { authorization: `Bearer ${token}` }
Response: { success message }
```

**Captain Logout**
```javascript
GET ${VITE_BASE_URL}/captain/logout
Headers: { authorization: `Bearer ${token}` }
Response: { success message }
```

#### Map & Location Services

**Get Location Suggestions**
```javascript
GET ${VITE_BASE_URL}/map/get-suggestions
Params: { input }
Headers: { authorization: `Bearer ${token}` }
Response: { suggestions: [] }
```

#### Ride Management

**Get Fare Calculation**
```javascript
GET ${VITE_BASE_URL}/ride/get-fare
Params: { pickup, destination }
Headers: { authorization: `Bearer ${token}` }
Response: { fare data }
```

**Create New Ride**
```javascript
POST ${VITE_BASE_URL}/ride/create
Body: { pickup, destination, vehicleType }
Headers: { authorization: `Bearer ${token}` }
Response: { ride data }
```

**Confirm Ride (Captain)**
```javascript
POST ${VITE_BASE_URL}/ride/confirm
Body: { rideId, captainId }
Headers: { authorization: `Bearer ${token}` }
Response: { confirmed ride data }
```

**Start Ride (Captain)**
```javascript
GET ${VITE_BASE_URL}/ride/start-ride
Params: { rideId, otp }
Headers: { authorization: `Bearer ${token}` }
Response: { started ride data }
```

**End Ride (Captain)**
```javascript
POST ${VITE_BASE_URL}/ride/end-ride
Body: { rideId }
Headers: { authorization: `Bearer ${token}` }
Response: { completed ride data }
```

### Socket.io Events

#### Connection Events

**Socket Connection**
```javascript
// Automatic connection on app start
const socket = io(`${VITE_BASE_URL}`);
```

**Join Room**
```javascript
// User joins socket room
socket.emit('join', { userId, userType });
// userType: 'user' | 'captain'
```

**Joined Confirmation**
```javascript
// Server confirms successful join
socket.on('joined', (data) => {
  // data: { success: boolean, socketId: string }
});
```

#### Real-time Location Updates

**Captain Location Update**
```javascript
// Captain sends location every 10 seconds
socket.emit('update-location-captain', { 
  captainId, 
  ltd: latitude, 
  lng: longitude 
});
```

#### Ride Events

**New Ride Request (Captain)**
```javascript
// Captain receives new ride request
socket.on('new-ride', (rideData) => {
  // rideData: { _id, pickup, destination, fare, user, etc. }
});
```

**Ride Confirmed (User)**
```javascript
// User receives ride confirmation
socket.on('ride-confirmed', (data) => {
  // data: { ride details with captain info }
});
```

**Ride Started (User)**
```javascript
// User notified when ride starts
socket.on('ride-started', (ride) => {
  // ride: { complete ride data }
});
```

**Ride Ended (User)**
```javascript
// User notified when ride ends
socket.on('ride-ended', () => {
  // Navigate back to home
});
```

### Event Flow Summary

#### User Ride Flow
1. **Join Socket**: `socket.emit('join', { userId, userType: 'user' })`
2. **Create Ride**: `POST /ride/create`
3. **Wait for Confirmation**: `socket.on('ride-confirmed')`
4. **Ride Starts**: `socket.on('ride-started')`
5. **Ride Ends**: `socket.on('ride-ended')`

#### Captain Ride Flow
1. **Join Socket**: `socket.emit('join', { userId, userType: 'captain' })`
2. **Location Updates**: `socket.emit('update-location-captain')` (every 10s)
3. **Receive Ride Request**: `socket.on('new-ride')`
4. **Confirm Ride**: `POST /ride/confirm`
5. **Start Ride**: `GET /ride/start-ride`
6. **End Ride**: `POST /ride/end-ride`

### Error Handling

#### Token Error Handling
```javascript
// Global token error handler
export const handleTokenError = (error, logoutCallback) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('captain');
    if (logoutCallback) logoutCallback();
    return true;
  }
  return false;
};
```

#### Socket Error Handling
```javascript
// Socket connection error handling
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});
```

### Request/Response Interceptors

#### Axios Configuration
```javascript
// Base URL configuration
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// Request interceptor for adding auth headers
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      handleTokenError(error);
    }
    return Promise.reject(error);
  }
);
```

## Development Guidelines

### Code Style
- **ESLint**: Enforced code formatting and best practices
- **React Hooks**: Functional components with hooks
- **Component Structure**: Consistent file organization
- **Naming Conventions**: Clear and descriptive names

### Performance
- **Code Splitting**: Route-based code splitting
- **Memoization**: useCallback and useMemo for optimization
- **Lazy Loading**: Component lazy loading where appropriate
- **Bundle Optimization**: Vite for fast builds

### Testing
- **Component Testing**: Unit tests for components
- **Integration Testing**: API integration tests
- **E2E Testing**: End-to-end user flow tests

### Deployment
- **Build Process**: Vite build optimization
- **Environment Variables**: Configuration management
- **Static Assets**: Optimized asset delivery
- **CDN Integration**: Content delivery network setup

## Troubleshooting

### Common Issues
1. **Socket Connection**: Check backend server status
2. **Google Maps**: Verify API key configuration
3. **Authentication**: Clear localStorage and re-login
4. **Build Errors**: Check dependency versions

### Debug Tools
- **React DevTools**: Component inspection
- **Network Tab**: API request monitoring
- **Console Logs**: Error tracking
- **Socket Debug**: Real-time event monitoring

## Contributing

### Development Setup
1. Fork the repository
2. Create feature branch
3. Follow coding standards
4. Test thoroughly
5. Submit pull request

### Code Review
- Component functionality
- Performance considerations
- Accessibility compliance
- Mobile responsiveness
- Error handling

This documentation provides a comprehensive overview of the Uber Clone Frontend application, covering all aspects from setup to deployment. 