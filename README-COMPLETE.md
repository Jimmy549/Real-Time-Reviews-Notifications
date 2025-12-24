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
│   ├── admin/                 # Admin moderation ✨
│   ├── products/              # Product updates ✨
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

### Admin Moderation ✨
- `DELETE /admin/reviews/:id` - Delete review with notification
- `PATCH /admin/reviews/:id/flag` - Flag review with notification

### Product Updates ✨
- `PATCH /products/:id` - Update product (notifies all reviewers)

## 🔄 Real-Time Events

### Socket.IO Events
- `new_review` - Broadcast to all users
- `new_reply` - Sent to review owner only
- `review_liked` - Sent to review author only
- `admin_action` - Admin moderation & product updates

## 🧪 Testing Checklist

### Core Features
- ✅ Review saved in MongoDB
- ✅ Reply saved in MongoDB  
- ✅ Like count updated
- ✅ Notification stored
- ✅ Socket emits correctly
- ✅ Correct user receives event

### Bonus Features ✨
- ✅ Admin delete review → Author notified
- ✅ Admin flag review → Author notified
- ✅ Product update → All reviewers notified
- ✅ Real-time admin actions

## ✨ Complete Feature Comparison

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| **Core Reviews & Replies** | ✅ | NestJS APIs with MongoDB |
| **Real-time Notifications** | ✅ | Socket.IO integration |
| **Broadcast (new reviews)** | ✅ | All users notified |
| **Direct (replies)** | ✅ | Review owner only |
| **Likes/Upvotes** | ✅ | Review author notified |
| **Admin Moderation** | ✅ | Delete/flag with notifications |
| **Product Updates** | ✅ | Notify all reviewers |
| **Same MongoDB** | ✅ | Shared database integration |
| **JWT Authentication** | ✅ | Secure API endpoints |

## 🎯 All Project Objectives Met

### 1️⃣ Reviews & Replies in NestJS ✅
- ✅ Adding reviews to products
- ✅ Adding replies to reviews  
- ✅ Fetching reviews per product
- ✅ Same MongoDB database integration

### 2️⃣ Real-Time Notifications with Socket.IO ✅
- ✅ Broadcast → New review → All users
- ✅ Direct → Reply → Review owner only
- ✅ Likes → Review author notified
- ✅ No page refresh required

### 3️⃣ Bonus Scenarios ✅
- ✅ Admin moderation → Delete/flag reviews
- ✅ Product updates → Notify reviewers
- ✅ Real-time admin actions

## 🔧 Environment Variables

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-jwt-secret-key-here
JWT_EXPIRES_IN=7d
```

## 🚀 Ready for Frontend Integration

The backend is complete and ready to integrate with your existing E-Commerce React frontend:

- Same MongoDB database ✅
- JWT authentication ✅  
- Socket.IO real-time events ✅
- RESTful API design ✅
- All project requirements met ✅