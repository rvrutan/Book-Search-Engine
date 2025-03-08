import type { User } from '../models/User.js';
import type { Book } from '../models/Book.js';

export const getMe = async (token: string) => {
  const query = `
    query Me {
      me {
        _id
        username
        email
        savedBooks {
          bookId
          title
          authors
          description
          image
          link
        }
      }
    }
  `;

  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  return response.json();
};

export const createUser = async (userData: User) => {
  const mutation = `
    mutation AddUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
          username
          email
        }
      }
    }
  `;

  const variables = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
  };

  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  return response.json();
};

export const loginUser = async (userData: User) => {
  const mutation = `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          _id
          username
          email
        }
      }
    }
  `;

  const variables = {
    email: userData.email,
    password: userData.password,
  };

  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  return response.json();
};

export const saveBook = async (bookData: Book, token: string) => {
  const mutation = `
    mutation SaveBook($bookData: BookInput!) {
      saveBook(bookData: $bookData) {
        _id
        username
        savedBooks {
          bookId
          title
        }
      }
    }
  `;

  const variables = {
    bookData: {
      bookId: bookData.bookId,
      authors: bookData.authors,
      description: bookData.description,
      image: bookData.image,
      link: bookData.link,
      title: bookData.title,
    },
  };

  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  return response.json();
};

export const deleteBook = async (bookId: string, token: string) => {
  const mutation = `
    mutation RemoveBook($bookId: ID!) {
      removeBook(bookId: $bookId) {
        _id
        username
        savedBooks {
          bookId
          title
        }
      }
    }
  `;

  const variables = {
    bookId,
  };

  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  return response.json();
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query: string) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
