# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `/product/index` [GET]
- Create `/product/create` [POST] [token required]
- Read `/product/get:id` [GET]
- Update `/product/update` [PATCH] [token required]
- Delete `/product/delete/:id` [DELETE] [token required]

#### Users

- Index `/users/index` [GET] [token required]
- Create `/users/create` [POST]
- Read `/users/get/:id` [GET] [token required]
- Update `/users/update` [PUT] [token required]
- Delete `/users/delete/:id` [DELETE] [token required]
- Auth `/users/authenticate` [POST]

#### Orders

- Index `/order/index` [GET] [token required]
- Create `/order/create` [POST] [token required]
- Read `/order/get/:id` [GET] [token required]
- Update `/orders/:id` [PUT] [token required]
- AddProduct `/orders/:id/products` [POST] [token required]
- Delete `/order/:id` [DELETE] [token required]
- CurrentOrderByUserId `/order/currentOrderByUserId/:id` [GET] [token required]

## Data Shapes

#### Product

Table: _product_

- id `uuid uuid_generate_v4() PRIMARY KEY`
- name `VARCHAR`
- price `VARCHAR`
- category `VARCHAR`

#### User

Table: _user_

- id `uuid uuid_generate_v4() PRIMARY KEY`
- firstname `VARCHAR NOT NULL`
- lastname `VARCHAR NOT NULL`
- password `VARCHAR NOT NULL`

#### Orders

Table: _order_

- order_id `uuid uuid_generate_v4() PRIMARY KEY`
- user_id `INTEGER` `REFERENCES users(id)`
- order_status `VARCHAR NOT NULL`

Table: _p_order_

- o_id `INTEGER` `REFERENCES orders(order_id)`
- p_id `uuid` `REFERENCES product(id)`
- quantity `INTEGER INTEGER NOT NULL`
- id `PRIMARY KEY`
