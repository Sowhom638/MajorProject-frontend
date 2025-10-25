# E-Commerce App
A e-commerce app where you can search products by category or name, we can filter the product list using category, We can add and remove product from cart and wishlist. We can increase and decrease number of item. We can also get notification for any action. We can see ordered history also.

Build with React frontend, Express/Node Backend, MongoDB database

---

## Demo Link
[Live Demo](https://major-project-frontend-pi.vercel.app)

---

## Quick Start
```
git clone https://github.com/Sowhom638/MajorProject-frontend
cd <your-repo>
npm install
npm run dev
```
---

## Technologies
- React JS
- React Router Dom
- Bootstrap
- Node JS
- Express JS
- MongoDB

---
## Demo Video
Watch a walkthrough of all the major features in a demo vide0;
[Google Drive Link]()

---

## Features

**Home Page**
- A landing page with a list of featured categories.
- when you click on any one of the categories it will be redirected to the product list page with that selected category.

**Product Listing Page**
- A product listing page where all the products are listed with a section of filters.
- Multiple filters on the product listing page including.
    - Category: A checkbox with various categories according to the theme.
    - Ratings: A slider for ratings.
    - Price: A radio button to sort from low to high & high to low.
- A button to clear filters from where you can clear all the applied filters.

**Product Details Page**
- If you click on any product you should be redirected to a single 
product page with all its details & the "Add to Cart" & "Add to Wishlist" buttons.

**Wishlist Management**
- From the navbar, you can navigate to your wishlist where all the products that you liked and wish to buy in future are mentioned.
    - On the product card, 
        - You can remove the item from the wishlist 
        - Add the item to the cart

**Cart Management**
- From the navbar, you can navigate to the cart where all the products 
    that you want to buy are mentioned.
- On the product card,
- You can see the quantity of a particular product.
- You can Increase or Decrease the quantity of a particular product.
- Remove the product from the cart
- Add the product to the Wishlist
- You can see the price details card of the cart containing a button to 
    checkout which will show the total price of the products with its quantity.

**Address Management**
- You can add multiple addresses, update or delete them.
- You can choose a single address to deliver the order.

**Checkout**
    Once you choose the address, you can click on the checkout button which would 
    show the order summary and a message - "Order Placed Successfully." 

**User Profile Page**
- You can see the user profile with details containing the name, email Id, phone number, address, etc.
- You Add new address from this page.
- You can see the order history from this page. Order History is all the orders placed previously.

**Search**
You can search for an item by category or name from the product list via the input text box on the header navbar.

---

## API References

**POST /products**
Create a new product
Sample Response
```
{_id , name, category, price, rating, isCarted, isWished, quantity, img, createdAt, updatedAt}
```

**GET /products**
Get all products
Sample Response
```
[
{_id , name, category, price, rating, isCarted, isWished, quantity, img, createdAt, updatedAt},
{_id , name, category, price, rating, isCarted, isWished, quantity, img, createdAt, updatedAt}, ... 
]
```

**GET /products/:productId**
Get product by it's id
Sample Response
```
{_id , name, category, price, rating, isCarted, isWished, quantity, img, createdAt, updatedAt}
```

**POST /products/:productId**
Update product by it's id
Sample Response
```
{_id , name, category, price, rating, isCarted, isWished, quantity, img, createdAt, updatedAt}
```

**GET /categories/:categoryId**
Get address by id
Sample Response
```
{_id , name, img, createdAt, updatedAt}
```

**GET /categories**
Get all addresses
Sample Response
```
[
{_id , name, img, createdAt, updatedAt},
{_id , name, img, createdAt, updatedAt}, ... 
]
```

**POST /addresses**
Create a new address
Sample Response
```
{_id , firstName, lastName, street, city, district, state, zipcode, createdAt, updatedAt}
```
**GET /addresses**
Get all addresses
Sample Response
```
[
{_id , firstName, lastName, street, city, district, state, zipcode, createdAt, updatedAt},
{_id , firstName, lastName, street, city, district, state, zipcode, createdAt, updatedAt}, ... 
]
```

**POST /orders**
Create a new order history
Sample Response
```
{_id , items, shippingAddress, totalAmount, createdAt, updatedAt}
```
**GET /orders**
Get all order history
Sample Response
```
[
{_id , items, shippingAddress, totalAmount, createdAt, updatedAt},
{_id , items, shippingAddress, totalAmount, createdAt, updatedAt}, ... 
]
```

---

## Contact
for bugs informin or feature requesting , reach out to ghoshsowhom638@gmail.com