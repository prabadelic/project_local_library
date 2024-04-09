function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  ).length;
}

function getMostCommonGenres(books) {
  let mostCommon = [];
  const genresMap = {};

  for (const book of books) {
    const genre = book.genre;
    genresMap[genre] = (genresMap[genre] || 0) + 1;
  }

  for (const [name, count] of Object.entries(genresMap)) {
    mostCommon.push({ name, count });
  }

  return sortSliceHelper(mostCommon, 5);
}

function getMostPopularBooks(books) {
  mostPopular = books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  });
  return sortSliceHelper(mostPopular, 5);
}

function getMostPopularAuthors(books, authors) {
  let mostPopularAuthors = [];
  authors.forEach((author) => {
    let currentAuthor = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };

    books.forEach((book) => {
      if (book.authorId === author.id) {
        currentAuthor.count += book.borrows.length;
      }
    });
    mostPopularAuthors.push(currentAuthor);
  });
  return sortSliceHelper(mostPopularAuthors, 5);
}

function sortSliceHelper(array, max) {
  const finalArray = [...array];
  return finalArray.sort((a, b) => b.count - a.count).slice(0, max);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
