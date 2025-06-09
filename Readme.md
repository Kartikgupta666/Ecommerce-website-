
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

## License

[Specify the License here, e.g., MIT]
```

**Explanation of the Structure and Content:**

*   **Heading Levels:** Uses `#` for the main title, `##` for major sections, and `###` for subsections, creating a clear hierarchy.
*   **Table of Contents:** Provides easy navigation to different sections.
*   **Backend/Client Separation:**  Clearly separates the backend and client-side aspects of the project.
*   **Technology Lists:** Uses bullet points for easy readability of technologies used.
*   **Endpoint Documentation:** Lists all the backend endpoints with their methods, routes, required parameters (request body and query parameters), and brief descriptions. This is crucial for developers using the API.
*   **Setup Instructions:** Provides step-by-step instructions on how to set up both the backend and client-side applications.
*   **Contributing and License:**  Includes standard sections for contributing and licensing information.
*   **Code Blocks:** Uses Markdown code blocks (using triple backticks `` ``` ``) to display commands and code snippets.
*   **Project Name:**  Uses the provided "Ecommerce-website-" project name throughout.

**How to Make it Interactive (Further Improvements):**

*   **Status Badges:**  Add badges to indicate build status (e.g., from Travis CI, CircleCI), code coverage, dependencies status, etc.  These badges are usually links to external services.
*   **Live Demo Link:** If the website is deployed somewhere, include a link to a live demo.
*   **Interactive API Documentation (Swagger/OpenAPI):**  Generate interactive API documentation using Swagger (OpenAPI).  You would need to install and configure Swagger in your backend and then link to the Swagger UI in your README.
*   **Example API Requests (using `curl` or similar):** Show example API requests and responses.
*   **GIF Demonstrations:**  Include short GIF recordings of key features of the website (e.g., a user signing up, adding an item to the cart).
*   **Contribution Guidelines (more detailed):**  Provide more specific contribution guidelines, including code style, testing procedures, etc.

To create an interactive API documentation , you'll typically use tools like Swagger (OpenAPI) or Postman. These tools allow you to define your API structure and generate interactive documentation that developers can use to explore and test your API endpoints.

Here's a general outline of how you can integrate Swagger/OpenAPI into your project:

**1. Install Swagger Dependencies**
**2. Define API Documentation**
**3. Customize Swagger UI**
**4. Serve Swagger UI**

This revised README provides a comprehensive overview of your e-commerce project and will be helpful to anyone who wants to understand, set up, or contribute to it.  Remember to replace the placeholder license with the actual license you choose.
