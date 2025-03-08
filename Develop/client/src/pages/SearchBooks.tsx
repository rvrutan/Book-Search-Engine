import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import type { Book } from "../models/Book";
import type { GoogleAPIBook } from "../models/GoogleAPIBook";
import { SAVE_BOOK } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // Set up the mutation for saving a book
  const [saveBookMutation] = useMutation(SAVE_BOOK);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const bookData = items.map((book: GoogleAPIBook) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author to display"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedBooks(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId: string) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave: Book = searchedBooks.find(
      (book) => book.bookId === bookId
    )!;

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveBookMutation({
        variables: {
          bookData: {
            bookId: bookToSave.bookId,
            authors: bookToSave.authors,
            title: bookToSave.title,
            description: bookToSave.description,
            image: bookToSave.image,
          },
        },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
<>
  <div className="bg-dark text-light py-5">
    <Container>
      <h1 className="display-4 text-center">Search for Books!</h1>
      <Form onSubmit={handleFormSubmit} className="mt-4">
        <Row className="align-items-center">
          <Col xs={12} md={8} className="mb-3 mb-md-0">
            <Form.Control
              name="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              size="lg"
              placeholder="Search for a book"
              className="shadow-sm"
            />
          </Col>
          <Col xs={12} md={4}>
            <Button type="submit" variant="success" size="lg" block>
              Submit Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  </div>

  <Container className="my-5">
    <h2 className="text-center">
      {searchedBooks.length
        ? `Viewing ${searchedBooks.length} results:`
        : 'Search for a book to begin'}
    </h2>

    <Row className="mt-4">
      {searchedBooks.map((book) => (
        <Col md={4} key={book.bookId} className="mb-4">
          <Card className="h-100 shadow-sm border-dark">
            {book.image && (
              <Card.Img
                src={book.image}
                alt={`The cover for ${book.title}`}
                className="card-img-top"
              />
            )}
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center mb-3">{book.title}</Card.Title>
              <p className="text-muted small text-center">Authors: {book.authors}</p>
              <Card.Text className="flex-grow-1">{book.description}</Card.Text>

              {Auth.loggedIn() && (
                <Button
                  disabled={savedBookIds?.some(
                    (savedBookId: string) => savedBookId === book.bookId
                  )}
                  variant="info"
                  className="mt-3"
                  onClick={() => handleSaveBook(book.bookId)}
                  block
                >
                  {savedBookIds?.some(
                    (savedBookId: string) => savedBookId === book.bookId
                  )
                    ? 'This book has already been saved!'
                    : 'Save this Book!'}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</>  );
};

export default SearchBooks;
