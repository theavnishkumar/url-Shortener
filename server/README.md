# URL Shortener API - Backend Documentation

A secure and feature-rich Express.js API for the URL Shortener application. Built with Node.js, Express, and MongoDB, featuring JWT authentication, comprehensive analytics, and robust security measures.

## Tech Stack

- **Runtime**: Node.js 
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.15.0
- **Authentication**: JWT with HTTP-only cookies
- **Security**: bcrypt for password hashing, CORS protection
- **Utilities**: nanoid for short URL generation, axios for external APIs
- **Development**: nodemon for hot reloading

## Project Structure

```
server/
├── controllers/          # Request handlers and business logic
│   ├── admin.controller.js      # Admin dashboard functionality
│   ├── auth.controller.js       # Authentication (login/signup/logout)
│   ├── contact.controller.js    # Contact form handling
│   ├── redirectUrl.controller.js # URL redirection logic
│   ├── url.controller.js        # URL CRUD operations and analytics
│   └── user.controller.js       # User profile and settings
├── middlewares/          # Custom middleware functions
│   ├── auth.js                  # JWT authentication middleware
│   └── checkAdmin.js            # Admin role verification
├── models/              # MongoDB schemas and models
│   ├── deletedURL.js           # Soft-deleted URLs with TTL
│   ├── Logins.js               # Login history tracking
│   ├── urlData.js              # URL data and click analytics
│   └── users.js                # User accounts and profiles
├── routes/              # API route definitions
│   ├── admin.js                # Admin-only routes
│   ├── auth.js                 # Authentication routes
│   ├── contact.js              # Contact form routes
│   ├── redirectUrl.js          # URL redirection routes
│   ├── url.js                  # URL management routes
│   └── user.js                 # User management routes
├── utils/               # Helper functions and utilities
│   ├── cache.js                # In-memory caching system
│   ├── createIndexes.js        # Database index creation
│   ├── geoDetails.js           # IP geolocation services
│   └── jwt.js                  # JWT token utilities
├── connection.js        # MongoDB connection setup
├── server.js           # Main application entry point
├── package.json        # Dependencies and scripts
└── .env.example        # Environment variables template
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone and Install
```bash
git clone https://github.com/theavnishkumar/url-Shortener.git
cd url-Shortener/server
npm install
```

### 2. Environment Configuration
Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/url-shortener
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/url-shortener

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
ORIGIN=http://localhost:5173

# Email Service (Optional - for contact form)
RESEND_API_KEY=your-resend-api-key
```

### 3. Start the Server
```bash
# Development mode with hot reloading
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000` (or your specified PORT).

## Database Models

### Users Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String (optional),
  role: String (enum: ['user', 'admin'], default: 'user'),
  ipAddress: String,
  userAgent: String,
  location: {
    country: String,
    region: String,
    city: String,
    isp: String
  },
  signupAt: Date (default: now),
  timestamps: true
}
```

### URL Data Schema
```javascript
{
  originalUrl: String (required),
  shortId: String (required, unique),
  createdBy: ObjectId (ref: Users, required),
  createdAt: Date (expires after 2 years),
  ipAddress: String,
  userAgent: String,
  location: Object,
  clicks: [{
    ipAddress: String,
    userAgent: String,
    location: Object,
    clickedAt: Date (default: now)
  }]
}
```

### Login History Schema
```javascript
{
  userId: ObjectId (ref: Users, required),
  ipAddress: String,
  userAgent: String,
  location: Object,
  loginAt: Date (expires after 1 year)
}
```

## API Endpoints

### Authentication Routes (`/auth`)

#### POST `/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### POST `/auth/login`
Authenticate user and set HTTP-only cookie.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### POST `/auth/logout`
Clear authentication cookie and logout user.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### URL Management Routes (`/url`) - Protected
*All routes require authentication*

#### GET `/url`
Get all URLs created by the authenticated user.

**Response:**
```json
{
  "urls": [
    {
      "id": "urlId",
      "originalUrl": "https://example.com",
      "shortId": "abc123",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "clicks": []
    }
  ]
}
```

#### POST `/url/create`
Create a new shortened URL.

**Request Body:**
```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "message": "URL created successfully",
  "url": {
    "id": "urlId",
    "originalUrl": "https://example.com/very/long/url",
    "shortId": "abc123",
    "shortUrl": "http://localhost:3000/abc123"
  }
}
```

#### DELETE `/url/:id`
Delete a specific URL (moves to deleted URLs collection).

**Response:**
```json
{
  "message": "URL deleted successfully"
}
```

#### GET `/url/dashboard`
Get dashboard statistics for the authenticated user.

**Response:**
```json
{
  "totalUrls": 15,
  "totalClicks": 1250,
  "activeUrls": 12,
  "clickThroughRate": 83.33,
  "recentUrls": []
}
```

#### GET `/url/analytics`
Get comprehensive analytics for all user URLs.

**Response:**
```json
{
  "analytics": {
    "totalClicks": 1250,
    "clicksByDate": {},
    "topUrls": [],
    "locationStats": {},
    "deviceStats": {}
  }
}
```

#### GET `/url/analytics/:id`
Get detailed analytics for a specific URL.

**Response:**
```json
{
  "url": {
    "originalUrl": "https://example.com",
    "shortId": "abc123",
    "totalClicks": 45,
    "clicks": [],
    "clicksByDate": {},
    "locationStats": {}
  }
}
```

### User Management Routes (`/user`) - Protected
*All routes require authentication*

#### GET `/user`
Get current user profile information.

**Response:**
```json
{
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "signupAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PATCH `/user`
Change user password.

**Request Body:**
```json
{
  "currentPassword": "oldPassword",
  "newPassword": "newSecurePassword123"
}
```

#### GET `/user/logins`
Get login history for the current user.

**Response:**
```json
{
  "logins": [
    {
      "ipAddress": "192.168.1.1",
      "location": {
        "country": "United States",
        "region": "California",
        "city": "San Francisco"
      },
      "loginAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST `/user/:id`
Delete user account (admin only or self-deletion).

### URL Redirection Routes (`/redirect`)

#### GET `/redirect/:shortId`
Redirect to original URL and track click analytics.

**Response:** HTTP 302 redirect to original URL

### Contact Routes (`/contact`)

#### POST `/contact`
Submit contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I have a question..."
}
```

### Admin Routes (`/admin`) - Admin Only
*Requires admin role*

#### GET `/admin`
Get admin dashboard with system-wide statistics.

**Response:**
```json
{
  "totalUsers": 1500,
  "totalUrls": 25000,
  "totalClicks": 500000,
  "recentActivity": []
}
```

## Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **HTTP-only Cookies**: Prevents XSS attacks on tokens
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **Role-based Access**: Admin and user role separation

### Data Protection
- **CORS Configuration**: Restricts cross-origin requests
- **Input Validation**: Validates and sanitizes user inputs
- **Rate Limiting**: Prevents abuse (implement as needed)
- **IP Logging**: Tracks user activity for security monitoring

### Privacy Features
- **Automatic Data Cleanup**: TTL indexes for login history and deleted URLs
- **Geolocation Tracking**: Optional IP-based location tracking
- **Safe URL Deletion**: Soft delete with 6-month recovery period

## Database Indexes

The application automatically creates optimized database indexes:

```javascript
// Performance indexes
urlData: { "clicks.clickedAt": 1, "createdBy": 1 }
Logins: { "loginAt": 1, "userId": 1 }
Users: { "signupAt": 1 }

// Compound indexes for complex queries
urlData: { "clicks.clickedAt": 1, "createdBy": 1 }
```

## Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener
JWT_SECRET=your-production-jwt-secret-key
ORIGIN=https://yourdomain.com
```

### Vercel Deployment
The project includes `vercel.json` configuration for easy Vercel deployment:

```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/server.js" }]
}
```

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Utilities & Helpers

### Caching System (`utils/cache.js`)
In-memory caching with TTL support for improved performance:
```javascript
import { cache } from './utils/cache.js';

// Set cache with 5-minute TTL
cache.set('key', data, 300000);

// Get cached data
const data = cache.get('key');
```

### Geolocation Service (`utils/geoDetails.js`)
IP-based location detection using ip-api.com:
```javascript
import { getLocationFromIp, getClientIp } from './utils/geoDetails.js';

const ip = getClientIp(req);
const location = await getLocationFromIp(ip);
```

### JWT Utilities (`utils/jwt.js`)
Token generation and verification helpers:
```javascript
import { generateToken, verifyToken } from './utils/jwt.js';

const token = generateToken(userId, role);
const decoded = verifyToken(token);
```

## Error Handling

The API uses consistent error response format:
```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Performance Considerations

- **Database Indexes**: Optimized queries with proper indexing
- **Connection Pooling**: MongoDB connection pooling via Mongoose
- **Caching**: In-memory caching for frequently accessed data
- **TTL Collections**: Automatic cleanup of old data
- **Efficient Queries**: Aggregation pipelines for analytics

## Testing

Currently, the project uses a placeholder test script. To implement testing:

```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

## Contributing

1. Follow the existing code structure and naming conventions
2. Ensure all routes are properly authenticated where required
3. Add appropriate error handling for new endpoints
4. Update this documentation for any new features
5. Test thoroughly before submitting pull requests

## License

This project is licensed under the ISC License.

---

**Author**: Avnish Kumar  
**Version**: 2.0.0  
**Last Updated**: August 2025