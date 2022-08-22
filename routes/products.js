const { Router } = require("express");
const router = Router();
const Products = require("../model/products");
const Categories = require("../model/category");
const admin = require("../model/admin");

router.get("/", async (req, res) => {
  const products = await Products.find().populate("category");

  res.render("products", {
    title: "Products",
    products,

  });
});

router.get("/add", async (req, res) => {
  const categories = await Categories.find();

  res.render("productsAdd", {
    title: "Product add",
    categories,
  });
});

router.post("/add", async (req, res) => {
  const product = new Products(req.body);
  try {
    await product.save();
  } catch (error) {
    console.log(error);
  }
  res.redirect("/products");
});

router.get("/:id", async (req, res) => {
  const products = await Products.find({ category: req.params.id }).populate(
    "category"
  );

  res.render("products", {
    title: "Products",
    products,
  });
});

router.get("/delete/:id", async (req, res) => {
  try {
    const deleted = await Products.findByIdAndDelete(req.params.id);
    console.log(deleted);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/products");
});

router.get("/edit/:id", async (req, res) => {
  const category = await Categories.find();
  const products = await Products.findById(req.params.id);

  console.log(products);

  res.render("productsEdit", {
    products,
    category,
  });
});

router.post("/edit/:id", async (req, res) => {
  try {
    const created = await Products.findByIdAndUpdate(req.params.id, req.body);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/products");
});
module.exports = router;
