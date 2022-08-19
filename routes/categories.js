const { Router } = require("express");
const router = Router();
const Category = require("../model/category");

router.get("/", async (req, res) => {
  const categories = await Category.find();
  console.log(categories);
  res.render("categories", {
    title: "Categories",
    categories,
  });
});

router.get("/add", (req, res) => {
  res.render("categoryAdd", {
    title: "Create new category",
  });
});

router.get("/delete/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    console.log(deleted);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/categories");
});

router.get("/edit/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.render("categoryEdit", {
    category,
  });
});

router.post("/edit/:id", async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/categories')
});

router.post("/add", async (req, res) => {
  const { categoryName, categoryImg } = req.body;
  const category = new Category({
    categoryName,
    categoryImg,
  });

  await category.save();
  res.redirect("/categories");
});

module.exports = router;
