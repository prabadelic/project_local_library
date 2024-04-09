function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id
  return books.reduce((totalBorrows, book) => {
    const filteredBorrows = book.borrows.filter(
      (borrow) => borrow.id === accountId
    );
    return totalBorrows + filteredBorrows.length;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  //iterate through all the books
  // we want to check if the current book has borrows array that containts the account id
  // and is not returned/ returne == false

  const borrowedBooks = [];
  for (const book of books) {
    for (const borrow of book.borrows) {
      if (borrow.id === account.id && borrow.returned == false) {
        const authorInfo = authors.find(
          (author) => author.id === book.authorId
        );

        book["author"] = authorInfo;

        borrowedBooks.push(book);
      }
    }
  }
  return borrowedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
