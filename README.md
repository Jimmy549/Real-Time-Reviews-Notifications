# Real-Time Reviews & Notifications Backend

NestJS + MongoDB + Socket.IO backend for real-time reviews and notifications system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB running on localhost:27017
- Same MongoDB database as existing E-commerce app

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev
```

Server will run on `http://localhost:3001`

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.module.ts          # Main app module
│   ├── main.ts                # Server bootstrap
│   ├── config/                # Database & JWT config
│   ├── auth/                  # Authentication (JWT)
│   ├── users/                 # User profiles
│   ├── reviews/               # Core review logic
│   ├── replies/               # Nested replies
│   ├── likes/                 # Like/Unlike system
│   ├── notifications/         # Notification storage
│   ├── websocket/             # Real-time events
│   └── utils/                 # Constants
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user

### Reviews
- `POST /reviews` - Add review (protected)
- `GET /reviews/:productId` - Get reviews for product
- `DELETE /reviews/:id` - Delete review (protected)

### Replies
- `POST /replies` - Add reply (protected)
- `GET /replies/:reviewId` - Get replies for review

### Likes
- `POST /likes/:reviewId` - Like review (protected)
- `DELETE /likes/:reviewId` - Unlike review (protected)

### Notifications
- `GET /notifications` - Get user notifications (protected)
- `PATCH /notifications/:id/read` - Mark as read (protected)

## 🔄 Real-Time Events

### Socket.IO Events
- `new_review` - Broadcast to all users
- `new_reply` - Sent to review owner only
- `review_liked` - Sent to review author only
- `admin_action` - Broadcast to all users

### Connection
```javascript
const socket = io('http://localhost:3001');

socket.on('new_review', (data) => {
  console.log('New review:', data);
});

socket.on('new_reply', (data) => {
  console.log('New reply:', data);
});

socket.on('review_liked', (data) => {
  console.log('Review liked:', data);
});
```

## 🧪 Testing Checklist

### Manual Testing Steps

1. **Register/Login**
   ```bash
   POST /auth/register
   {
     "username": "testuser",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

2. **Add Review**
   ```bash
   POST /reviews
   Headers: Authorization: Bearer <token>
   {
     "productId": "product123",
     "content": "Great product!",
     "rating": 5
   }
   ```

3. **Add Reply**
   ```bash
   POST /replies
   Headers: Authorization: Bearer <token>
   {
     "reviewId": "<review_id>",
     "content": "Thanks for the review!"
   }
   ```

4. **Like Review**
   ```bash
   POST /likes/<review_id>
   Headers: Authorization: Bearer <token>
   ```

5. **Check Notifications**
   ```bash
   GET /notifications
   Headers: Authorization: Bearer <token>
   ```

### Verification Points
- ✅ Review saved in MongoDB
- ✅ Reply saved in MongoDB  
- ✅ Like count updated
- ✅ Notification stored
- ✅ Socket emits correctly
- ✅ Correct user receives event

## 🔧 Environment Variables

Create `.env` file:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-jwt-secret-key-here
JWT_EXPIRES_IN=7d
```

## 🏗️ Architecture Principles

### Data vs Real-Time Rule
- **REST APIs** → Data handling (CRUD operations)
- **WebSockets** → Real-time notifications only
- **No DB logic** inside socket handlers

### Notification Flow
1. Action occurs (review/reply/like)
2. Data saved to MongoDB via REST API
3. Notification stored in database
4. Real-time event emitted via Socket.IO
5. Frontend receives both data and notification

## 🔒 Security Features

- JWT authentication for protected routes
- Password hashing with bcrypt
- CORS enabled for frontend integration
- Input validation with class-validator

## 📊 Database Schema

### Users
- username, email, profileImage, bio, password

### Reviews  
- productId, userId, content, rating, likesCount

### Replies
- reviewId, userId, content

### Likes
- reviewId, userId (unique constraint)

### Notifications
- receiverId, senderId, type, message, isRead

## 🚀 Production Deployment

1. Set production environment variables
2. Build the application: `npm run build`
3. Start production server: `npm run start:prod`
4. Configure reverse proxy (nginx)
5. Set up MongoDB replica set for production
6. Configure SSL certificates

## 🤝 Integration with Frontend

This backend is designed to work with the existing E-commerce frontend. Key integration points:

- Same MongoDB database
- JWT tokens for authentication
- Socket.IO for real-time updates
- RESTful API design
- CORS enabled for cross-origin requests