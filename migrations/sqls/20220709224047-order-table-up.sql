/* Replace with your SQL commands */
CREATE TABLE orders (
    order_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_status CHAR(7) ,
    user_id uuid REFERENCES users,
);