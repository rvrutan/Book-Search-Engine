# 18 MERN: Book Search Engine (GraphQL Refactor)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This project refactors an existing book search engine application from a RESTful API to a GraphQL API, utilizing Apollo Server. The application allows users to search for books using the Google Books API, save books to their personal lists, and manage their saved books. It employs the MERN stack (MongoDB, Express.js, React, Node.js) with GraphQL for efficient data fetching and manipulation.

**Deployed Website:** [https://library-6iwq.onrender.com/](https://library-6iwq.onrender.com/)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Screenshots/Demo](#screenshotsdemo)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Installation

1.  Clone the repository to your local machine:

    ```bash
    git clone [YOUR_REPOSITORY_URL]
    ```

2.  Navigate to the project directory:

    ```bash
    cd [YOUR_PROJECT_DIRECTORY]
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```

4.  Set up your MongoDB Atlas connection string in a `.env` file at the root of your project:

    ```
    MONGODB_URI=your_mongodb_atlas_connection_string
    ```

5.  Run the application in development mode:

    ```bash
    npm run develop
    ```

## Usage

1.  Open your web browser and navigate to [http://localhost:3000/](http://localhost:3000/) (or [https://library-6iwq.onrender.com/](https://library-6iwq.onrender.com/) for the deployed version).

2.  **Search for Books:** Use the search bar on the home page to enter a book title, author, or keyword. Click the "Search" button to display results from the Google Books API.

3.  **Sign Up/Log In:** To save books, you need to create an account or log in. Click the "Login/Signup" button in the navigation bar to access the authentication modal.

4.  **Save Books:** After logging in, you'll see a "Save This Book!" button on each search result. Click this button to save a book to your personal list.

5.  **View Saved Books:** Click "See My Saved Books" in the navigation bar to view your saved books.

6.  **Remove Books:** On the saved books page, you can click the "Remove This Book!" button to delete a book from your list.

7.  **Log Out:** Click the "Logout" button in the navigation bar to log out of your account.

## Technologies Used

-   **Frontend:**
    -   React
    -   Apollo Client
    -   JSX
    -   CSS
    -   Bootstrap (or other styling library)

-   **Backend:**
    -   Node.js
    -   Express.js
    -   MongoDB
    -   Mongoose
    -   GraphQL
    -   Apollo Server
    -   JSON Web Tokens (JWT) for authentication

## Screenshots/Demo

(Add your screenshots or a link to a demo video here after you take them)

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b fix/your-bug-fix-name`.
3.  Make your changes and commit them: `git commit -m 'Add some feature'` or `git commit -m 'Fix some bug'`.
4.  Push your changes to your fork: `git push origin feature/your-feature-name`.
5.  Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Questions

If you have any questions, please feel free to contact me:

-   GitHub: [rvrutan](https://github.com/rvrutan)
-   Email: [rutanroni@gmail.com](rutanroni@gmail.com)
