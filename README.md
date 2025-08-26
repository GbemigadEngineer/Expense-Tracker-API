# Expenser - Expense Tracker API

A simple and efficient expense tracking API built with Node.js and MongoDB. Manage your personal expenses with user authentication, CRUD operations, and flexible filtering options. Project 4 of my 20 backend projects from beginner to mastery.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Expense Management**: Full CRUD operations for expenses
- **Filtering Options**: Filter expenses by time periods (past week, month, 3 months, or custom date range)
- **Password Recovery**: Forgot password and reset functionality
- **Category Support**: Predefined expense categories (Groceries, Leisure, Electronics, Utilities, Clothing, Health, Others)
- **Secure Endpoints**: JWT-protected routes for authenticated operations

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Postman
- **Version Control**: GitHub
- **Deployment**: Railway
- **Architecture**: RESTful API

## 📁 Project Structure

```
expenser/
├── app.js                 # Express app configuration
├── server.js              # Server entry point
├── package.json           # Dependencies and scripts
├── config.env             # Environment variables
├── .gitignore             # Git ignore rules
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── expenseController.js # Expense CRUD operations
│   └── userController.js  # User management
├── middleware/
│   ├── authMiddleware.js  # JWT authentication middleware
│   └── errorHandler.js    # Global error handling
├── models/
│   ├── expenseModel.js    # Expense data schema
│   └── userModel.js       # User data schema
├── routes/
│   ├── authRoutes.js      # Authentication endpoints
│   ├── expenseRoutes.js   # Expense endpoints
│   └── userRoutes.js      # User endpoints
└── utils/
    ├── appError.js        # Custom error class
    └── catchAsync.js      # Async error wrapper
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud instance)
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/expenser.git
   cd expenser
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `config.env` file in the root directory:

   ```env
   JWT_SECRET=your_jwt_secret_here
   DATABASE_CONNECTION_STRING=mongodb://localhost:27017/expenser
   # or for MongoDB Atlas:
   # DATABASE_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/expenser
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

The API will be available at `http://localhost:5000` (or your specified port).

## 🔗 API Endpoints

### Authentication Routes

| Method | Endpoint                       | Description               | Auth Required | Password Required |
| ------ | ------------------------------ | ------------------------- | ------------- | ----------------- |
| POST   | `/api/v1/auth/signup`          | Register new user         | No            | NO                |
| POST   | `/api/v1/auth/login`           | User login                | No            | Yes               |
| POST   | `/api/v1/auth/forgot-password` | Request password reset    | No            | NO                |
| POST   | `/api/v1/auth/reset-password`  | Reset password with token | No            | NO                |

### Expense Routes

| Method | Endpoint                        | Description              | Auth Required |
| ------ | ------------------------------- | ------------------------ | ------------- |
| POST   | `/api/v1/expenser/expenses`     | Create new expense       | Yes           |
| GET    | `/api/v1/expenser/expenses`     | Get all user expenses    | Yes           |
| GET    | `/api/v1/expenser/expenses/:id` | Get single expense by ID | Yes           |
| PATCH  | `/api/v1/expenser/expenses/:id` | Update expense           | Yes           |
| DELETE | `/api/v1/expenser/expenses/:id` | Delete expense           | Yes           |

### User Routes

| Method | Endpoint                    | Description         | Auth Required | Password Required |
| ------ | --------------------------- | ------------------- | ------------- | ----------------- |
| GET    | `/api/v1/expenser/user`     | Get all users       | Yes           | NO                |
| PATCH  | `/api/v1/expenser/user/:id` | Update user profile | Yes           | NO                |
| GET    | `/api/v1/expenser/user/:id` | Get user profile    | Yes           | NO                |
| DELETE | `/api/v1/expenser/user/:id` | Soft delete user    | Yes           | YES               |

## 📝 API Usage Examples

### User Registration

```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
  "passwordConfirm": "securepassword123"
}
```

### User Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Create Expense

```http
POST /api/expenses
Authorization: Bearer your_jwt_token_here
Content-Type: application/json

{
  "title": "Weekly Groceries",
  "amount": 85.50,
  "category": "Groceries",
  "description": "Weekly grocery shopping at local store",
  "date": "2024-01-15"
}
```

### Get Expenses with Filters

## Filter with dates, currency, amount

```http
GET /api/expenses?filter=past-week
GET /api/expenses?filter=last-month
GET /api/expenses?filter=last-3-months
GET /api/expenses?filter=custom&startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer your_jwt_token_here
```

## 📊 Expense Categories

The API supports the following predefined categories:

- **Groceries**: Food and household items
- **Leisure**: Entertainment, dining out, hobbies
- **Electronics**: Gadgets, software, tech purchases
- **Utilities**: Bills, internet, phone, electricity
- **Clothing**: Apparel and accessories
- **Health**: Medical expenses, fitness, wellness
- **Others**: Miscellaneous expenses

## 🔒 Authentication

This API uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in the Authorization header:

```
Authorization: Bearer your_jwt_token_here
```

Tokens are required for all expense operations and user profile management.

## 🌐 Deployment

The API is deployed on Railway. You can access the live version at:

```
https://expense-tracker-api-production-43d7.up.railway.app
```

## 🧪 Testing

Use Postman or any API testing tool to test the endpoints. Import the provided Postman collection for pre-configured requests.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the maintainer.

---

**Happy Expense Tracking! 💰**
