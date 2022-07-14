/* Replace with your SQL commands */
CREATE TABLE order_product (
     product_id uuid REFERENCES product,
     order_id uuid REFERENCES orders,
     quantity   INTEGER NOT NULL
     PRIMARY KEY (product_id, order_id)
);

