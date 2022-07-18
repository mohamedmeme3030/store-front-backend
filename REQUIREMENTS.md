# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: `'api/product/index' [GET] (token)`
- Show [id required]: `'api/product/get/:id' [GET] (token)'`
- Create: (arg: productOject) `'api/product/create' [POST] (token)`
- Update: (arg: productObject) `'api/product/update' [PATCH](token)`
- Delete: `'api/product/delete/:id' [DELETE] (token)`
    <!-- - [OPTIONAL] Top 5 most popular products -->
    <!-- - [OPTIONAL] Products by category (args: product category) -->

#### Users

- Index: `'api/users/index' [GET] (token)`
- Show: [token required] `'api/users/get/:id' [GET] (token)'`
- Create: (arg: userObject) `'api/users/create' [POST] (token)`

#### Orders

- Current Order by user (args: user id)[token required]: `'api/order/currentOrderByUserId/:id' [GET] (token)`

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

```
Table: product (id:uuid[primary key], name:VARCHAR(50) NOT NULL, price:VARCHAR(50) NOT NULL, category:VARCHAR(50))
```

#### User

- id
- firstName
- lastName
- password

```
Table: users (id:uuid[primary key], first_name:VARCHAR(50) NOT NULL, last_name:VARCHAR(50) NOT NULL, password:VARCHAR(255) NOT NULL)
```

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
Table: order (order_id:uuid[primary key], order_status:VARCHAR(20) NOT NULL
user_id uuid REFERENCES users)
```

#### Product-Order

- p_id
- o_id
- quantity

```
Table: p_order (p_id:uuid REFERENCES product, o_id:uuid REFERENCES orders,
quantity INTEGER NOT NULL,
PRIMARY KEY (p_id, o_id)
```
