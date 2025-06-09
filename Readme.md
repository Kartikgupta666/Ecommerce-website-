
# Ecommerce website

## Overview

This project represents a full-stack e-commerce website, featuring both a backend and a client-side implementation. The backend is built with Node.js, Express, and MongoDB, while the client is developed using React.

## Table of Contents

- [Backend](#backend)
  - [Technologies](#backend-technologies)
  - [Endpoints](#backend-endpoints)
- [Client](#client)
  - [Technologies](#client-technologies)
- [Setup](#setup)
  - [Backend Setup](#backend-setup)
  - [Client Setup](#client-setup)
- [Contributing](#contributing)
- [License](#license)

## Backend

The backend handles user authentication, item management, cart operations, and wishlist functionality.  It utilizes a multi-core architecture for improved performance.

### Backend Technologies

*   **Node.js:**  Runtime environment.
*   **Express:** Web framework.
*   **MongoDB:** Database.
*   **Mongoose:** ODM for MongoDB.
*   **bcryptjs:** For password hashing.
*   **jsonwebtoken:** For creating and verifying tokens.
*   **cors:** For enabling Cross-Origin Resource Sharing.
*   **express-validator:** For request body validation.
*   **Nodemon:** For automatic server restarts during development.
*   **cluster:** For utilizing multiple CPU cores.

### Backend Endpoints

*   **`POST /signup`:** Registers a new user.  Requires `name`, `email`, and `password` in the request body.  Performs email and password validation.
*   **`POST /login`:** Authenticates an existing user. Requires `email` and `password` in the request body.
*   **`POST /getUserDetails`:** Retrieves user details. Requires a valid JWT token in the `Authorization` header.
*   **`GET /Items`:** Retrieves all items from the database.
*   **`GET /SearchItem`:** Searches for items based on a query string in the `query` parameter.
*   **`POST /id`:** Retrieves a specific item by its ID.  Requires the item's `id` in the request body.
*   **`POST /AddItem`:** Adds a new item to the database. Requires `title`, `price`, `desc`, `category`, `image`, and `searchQuery` in the request body.
*   **`POST /Addcart`:** Adds an item to the user's cart. Requires the item's `id` in the request body and a valid JWT token in the `Authorization` header.
*   **`POST /Wishlist`:** Adds an item to the user's wishlist. Requires the item's `id` in the request body and a valid JWT token in the `Authorization` header.
*   **`GET /Viewwishlist`:** Retrieves the user's wishlist items. Requires a valid JWT token in the `Authorization` header.
*   **`GET /searchinwishlist`:** Searches for a specific item in the user's wishlist. Requires the item's `Item` id in the `query` parameter and a valid JWT token in the `Authorization` header.
*   **`POST /removeWishlist`:** Removes an item from the user's wishlist. Requires the wishlist item's `id` in the request body.
*   **`GET /ViewCart`:** Retrieves the user's cart items. Requires a valid JWT token in the `Authorization` header.
*   **`POST /removeCart`:** Removes an item from the user's cart. Requires the cart item's `id` in the request body.

## Client

The client-side is a React application that provides the user interface for the e-commerce website.

### Client Technologies

*   **React:** JavaScript library for building user interfaces.
*   **React Router DOM:** For handling routing.
*   **Axios:** For making HTTP requests to the backend.

## Setup

### Backend Setup

1.  **Install Dependencies:**

    ```bash
    cd backend
    npm install
    ```

2.  **Set up MongoDB:**  Ensure you have MongoDB installed and running. Update the connection string in `db.js` (or equivalent file where the database connection is established) with your MongoDB credentials.

3.  **Environment Variables:** Consider using environment variables (e.g., using `dotenv`) for sensitive information like the JWT secret key and database credentials.

4.  **Run the Server:**

    ```bash
    npm start
    ```

    This will start the backend server using `nodemon`, which will automatically restart the server on file changes.

### Client Setup

1.  **Install Dependencies:**

    ```bash
    cd client
    npm install
    ```

2.  **Configure API Base URL:**  Update the API base URL in your React components (where you make API calls using `axios`) to point to your backend server's address (e.g., `http://localhost:9000`).

3.  **Run the Client:**

    ```bash
    npm start
    ```

    This will start the React development server, usually on port 3000.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

