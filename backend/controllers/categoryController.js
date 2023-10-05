const Category = require('../models/category')
const category = new Category()

const getAllCategories = async (req, res) => {
    try {
      // console.log("two");
        const categories = await category.getAllCategories();
        // console.log(categories);
        res.status(200).json(categories);
      } catch (error) {
        console.error('Error fetching categories', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const createCategory = async (req, res) => {
    try {
        const { cname, cdesc, no_of_quiz } = req.body
        const cat = await category.createCategory(cname, cdesc, no_of_quiz)
        res.status(200).json(cat);
    } catch (error) {
        console.error('Error creating category', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteCategory = async (req, res) => {
  try {
    const {category_id} = req.params
    await category.deleteCategory(category_id)
    res.status(200).json({message: "Deleted category"})
  } catch (error) {
    console.error('Error deleting category', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getCategoryById = async (req, res) => {
  try {
    const {category_id} = req.params
    const result = await category.getCategoryById(category_id)
    res.status(200).json(result)
  } catch (error) {
    console.error('Error fetching category', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateCategory = async (req, res) => {
  const {category_id} = req.params
  const {cname, cdesc} = req.body
  // console.log("iiii",id);
  console.log(req.body);

  try {
      const result = await category.updateCategory(category_id, cname, cdesc)
      res.status(204).send({message: "Updated successfully"})
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateQuiz = async (req, res) => {
  const {category_id} = req.params
  try {
    await category.updateQuiz(category_id)
    res.status(204).send({message: "Updated successfully"})
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {getAllCategories, createCategory, deleteCategory, getCategoryById, updateCategory, updateQuiz}