const express = require("express");
const connection = require("../connection.js");

const router = express.Router();
//create
router.post("/create", (req, res, next) => {
  let product = req.body;
  query = "insert into product(name,description,price) value(?,?,?) ";
  connection.query(
    query,
    [product.name, product.description, product.price],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "product added successfully" });
      } else return res.status(500).json(err);
    }
  );
});
//show

router.get("/read", (req, res, next) => {
  var query = "select *from product";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else return res.status(500).json(err);
  });
});

//update

router.patch("/update/:id", (req, res, next) => {
  const id = req.params.id;
  let product = req.body;

  var query = "update product set name=?,description=?,price=? where id=?";

  connection.query(
    query,
    [product.name, product.description, product.price, id],
    (err, results) => {
      if (!err) {
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res
          .status(200)
          .json({ message: "Product updated successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});
//delete

router.delete("/delete/:id", (req, res, next) => {
  const id = req.params.id;
  var query = "delete from product where id=?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: "product deleted successfully" });
    } else return res.status(500).json(err);
  });
});

module.exports = router;
