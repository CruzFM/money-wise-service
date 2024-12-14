## Money Wise API

### Description

Money Wise is an API designed to manage personal transactions, including incomes and expenses. It provides secure endpoints for user registration, authentication via JWT, and CRUD operations on transactions. The API is built to integrate seamlessly with client applications that handle financial data.

---

### Features

- **Secure Authentication:** JWT-based token system to protect endpoints.
- **Transaction Management:** Create, list, update, and delete transactions.
- **Filtered Queries:** Retrieve income or expense transactions.
- **Standards Compliant:** Fully documented with Swagger (OpenAPI 3.0).

---

### Requirements

- Node.js (version 16 or higher)
- MongoDB
- NPM or Yarn

---

### Installation

1. Clone the repository:

   ```bash
   git clone <REPOSITORY_URL>
   cd moneywise
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=3000
   DATABASE_URL=your_mongodb_connection_string_here
   JWT_SECRET=your-jwt-secret
   ```

4. Start the server:

   ```bash
   npm start
   ```

---

### Usage

#### Available Endpoints

Check the Swagger documentation for detailed endpoint descriptions:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Key endpoints include:
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Authenticate and retrieve a JWT token.
- **POST /transactions/new**: Create a new transaction.
- **GET /transactions/all**: Retrieve all transactions for an authenticated user.

#### Security

All `/transactions` endpoints require a JWT token in the `Authorization` header using the format `Bearer <token>`.

---

### Project Structure

```
.
├── controllers
│   ├── transaction.controller.js
│   └── user.controller.js
├── docs
│   ├── auth.yaml
│   └── transactions.yaml
├── middleware
│   └── auth.js
├── models
│   ├── Transaction.model.js
│   └── User.model.js
├── routes
│   ├── auth.route.js
│   └── transaction.route.js
├── utils
│   └── auth.utils.js
├── README.md
├── package.json
├── swagger.js
└── app.js
```

---

### Swagger Documentation

The API is documented using Swagger, with YAML files stored in the `docs` folder.

---

### Testing

To run tests, use the following command:

```bash
npm test
```

---

### Contributions

Contributions are welcome! If you encounter any issues or have suggestions, feel free to open an issue or submit a pull request.

---

### License

This project is licensed under the [MIT License](LICENSE).