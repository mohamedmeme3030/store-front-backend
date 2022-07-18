/* Replace with your SQL commands */
CREATE TABLE p_order (
     p_id uuid REFERENCES product,
     o_id uuid REFERENCES orders,
     quantity   INTEGER NOT NULL,
     PRIMARY KEY (p_id, o_id)
);