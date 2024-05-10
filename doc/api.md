# API Spec

## Borrow Books

Endpoint : POST /api/borrow

Request Body :

```json
{
  "user_code": "M001",
  "book_code": "JK-45"
}
```

Response Body :

```json
{
  "status": "success",
  "data": {
    "code": 1,
    "user_code": "M001",
    "user_name": "Angga",
    "book_code": "JK-45",
    "book_title": "Harry Potter",
    "book_author": "J.K Rowling",
    "borrow_date": "08 May 2024"
  }
}
```

## Returning Books

Endpoint : POST /api/returning

Request Body :

```json
{
  "user_code": "M001",
  "book-code": "JK-45"
}
```

Response Body :

```json
{
  "status": "success",
  "data": {
    "code": 1,
    "user_code": "M001",
    "user_name": "Angga",
    "book_code": "JK-45",
    "book_title": "Harry Potter",
    "book_author": "J.K Rowling",
    "returning_date": "09 May 2024"
  }
}
```

## Get Books

Endpoint : GET /api/book

Response Body :

```json
{
  "status": "success",
  "amount_of_books": 4,
  "data": [
    {
      "code": "SHR-1",
      "title": "A Study in Scarlet",
      "author": "Arthur Conan Doyle",
      "stock": 1
    },
    {
      "code": "TW-11",
      "title": "Twilight",
      "author": "Stephenie Meyer",
      "stock": 1
    },
    {
      "code": "HOB-83",
      "title": "The Hobbit, or There and Back Again",
      "author": "J.R.R. Tolkien",
      "stock": 1
    },
    {
      "code": "NRN-7",
      "title": "The Lion, the Witch and the Wardrobe",
      "author": "C.S. Lewis",
      "stock": 1
    }
  ]
}
```

## Get Users

Endpoint : GET /api/user

Response Body :

```json
{
  "status": "success",
  "total_users": 3,
  "data": [
    {
      "code": "M001",
      "name": "Angga",
      "number of books borrowed": 1
    },
    {
      "code": "M002",
      "name": "Ferry",
      "number of books borrowed": 0
    },
    {
      "code": "M003",
      "name": "Putri",
      "number of books borrowed": 0
    }
  ]
}
```
