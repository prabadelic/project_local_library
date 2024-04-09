function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter(
    (book) => book.borrows[0].returned === false
  );
  const returnedBooks = books.filter(
    (book) => book.borrows[0].returned === true
  );
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = [];

  for (const borrow of book.borrows) {
    for (const account of accounts) {
      if (borrow.id === account.id) {
        const returnedStatus = borrow.returned;

        account["returned"] = returnedStatus;

        if (borrowers.length <= 9) {
          borrowers.push(account);
        }
      }
    }
  }
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
