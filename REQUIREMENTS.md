# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: `product/index` [GET]
  proceed it: localhost:3000/api/products/index
- Create: `product/create` [POST] [token required]
  proceed it: localhost:3000/api/products/create
  (arg:Product) as => jason
  {
  "name":"AAA",
  "price":30,
  "category":"AGG"
  }

- Show: `product/get:id` [GET]
  proceed it: localhost:3000/api/products/get/id

- Update `product/update` [PATCH] [token required]
  proceed it: localhost:3000/api/products/update
  (arg:Product) as => jason
  {
  "name":"AAA",
  "price":30,
  "category":"AGG"
  }

- Delete `/product/delete/:id` [DELETE] [token required]
  proceed it: localhost:3000/api/products/delete/id

#### Users

- Index: `/users/index` [GET] [token required]
  proceed it: localhost:3000/api/users/index
- Create: `/users/create` [POST]
  proceed it: localhost:3000/api/users/create
  (arg:User) as => jason
  {
  "first_name":"XXX",
  "last_name":"XXXX",
  "email":"XXXX@gmail.com",
  "password":"XXXX"
  }
- Show: `/users/get/:id` [GET] [token required]
  proceed it: localhost:3000/api/products/get/:id
- Update `/users/update` [PATCH] [token required]
  proceed it: localhost:3000/api/users/update
  (arg:User) as => jason
  {
  "first_name":"XXX",
  "last_name":"XXXX",
  "email":"XXXX@gmail.com",
  "password":"XXXX"
  }

- Delete: `/users/delete/:id` [DELETE] [token required]
  proceed it: localhost:3000/api/products/delete/:id

- Auth: `/users/authenticate` [POST]
  proceed it: localhost:3000/api/products/authenticate
  send email and password as => jason
  {
  "email":"XXXX@gmail.com",
  "password":"XXXX"
  }
  to validate thes email and pass then send a token for this user to be authorized

#### Orders

- Index: `/order/index` [GET] [token required]
  proceed it: localhost:3000/api/order/index

- Create `/order/create` [POST] [token required]
  proceed it: localhost:3000/api/order/create
  send user_id and order_status in body thid request as json =>
  {
  "user_id":"3dcaa40f-f0a9-41aa-a6ec-8e3211e7a8c6",
  "order_status":"Active"
  }

- AddProduct: `/orders/:id/products` [POST] [token required]
  proceed it: localhost:3000/api/order/:id/products
  to add products should have order so send order_id as param in url and set in body product id and quantity as json =>
  {
  "productId":"45e54cd4-82f7-49de-a451-1e696c97245a",
  "quantity":"2"
  }
- CurrentOrderByUserId `/order/currentOrderByUserId/:id` [GET] [token required]
  proceed it: localhost:3000/api/order/currentOrderByUserId
  to get current order by the user id so all that you need send user id in url params

## Data Shapes

#### Product

Table: _product_

- id
- name
- price
- category

##### Create Script

`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; CREATE TABLE product ( id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, name VARCHAR(50) NOT NULL, price VARCHAR(50) NOT NULL, category VARCHAR(50) );`

#### User

Table: _user_

- id
- firstname
- lastname
- password

##### Create Script

`/* Replace with your SQL commands */ CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; CREATE TABLE users ( id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, password VARCHAR(255) NOT NULL );`

#### Orders

Table: _order_

- order_id
- user_id
- order_status

##### Create Script

`CREATE TABLE orders ( order_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, order_status VARCHAR(20) NOT NULL, user_id uuid REFERENCES users );`

#### ProductOrder

Table: _p_order_

- o_id
- p_id
- quantity
- id

##### Create Script

`CREATE TABLE p_order ( p_id uuid REFERENCES product, o_id uuid REFERENCES orders, quantity INTEGER NOT NULL, id uuid DEFAULT uuid_generate_v4() PRIMARY KEY );`
