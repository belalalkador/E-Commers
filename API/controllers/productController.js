import sharp from "sharp";
import Product from "../Models/product.js";

export const addNewProducts = async (req, res) => {
  try {
    if (!req.user || !req.user.is_Admin) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to add the product!",
      });
    }
    const { title, category, description, price } = req.body;
    const productImage = req.file;

    if (!title || !category || !description || !price || !productImage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const imageOptimize = await sharp(productImage.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${imageOptimize.toString(
      "base64"
    )}`;

    const product = new Product({
      title,
      category,
      description,
      price,
      productImage: fileUri,
      author: req.user.id,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred: " + error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (!req.user || !req.user.is_Admin) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete the product!",
      });
    }

    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (!req.user || !req.user.is_Admin) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update the product!",
      });
    }

    const id = req.params.id;
    const { title, category, description, price } = req.body;
    const productImage = req.file;
  
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Product ID is required!",
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }
    
    if (title) product.title = title;
    if (category) product.category = category;
    if (description) product.description = description;
    if (price) product.price = price;
    
    if (productImage) {
        const imageOptimize = await sharp(productImage.buffer)
          .resize({ width: 800, height: 800, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();

      const fileUri = `data:image/jpeg;base64,${imageOptimize.toString(
        "base64"
      )}`;
      product.productImage = fileUri;
    }

    await product.save();

   
    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving products.",
      error: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving products.",
      error: error.message,
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          products: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 1,
          products: { $slice: ["$products", 8] }, // Limit to 6 products per category
        },
      },
    ]);

    res.status(200).json({
      success: true,
      products: productsByCategory,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllProductsForCategory = async (req, res) => {
  try {
    const { category } = req.params; 


    const products = await Product.find({ category });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const search = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const searchRegex = new RegExp(query, 'i'); // 'i' for case-insensitive

    // Search by title and description
    const products = await Product.find({
      $or: [
        { title: { $regex: searchRegex } },  // Search by title
        { description: { $regex: searchRegex } }, // Search by description
        { category: { $regex: searchRegex } }, // Search by description
      ]
    });

    if (products.length === 0) {
      return res.status(200).json({ message: 'No products found' });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

