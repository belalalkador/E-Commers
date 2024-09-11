import Buying from '../Models/buying.js';
import Product from '../Models/product.js';
import User from '../Models/userModels.js';

export const createBuying = async (req, res) => {
  try {
    let { productIds, userId } = req.body;

      productIds = JSON.parse(productIds);

    // Validate the existence of the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Iterate over the productIds array
    for (const productId of productIds) {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${productId} not found`,
        });
      }

      // Create a new Buying record for each product
      const newBuying = new Buying({
        productId,
        userId,
        date: req.body.date || Date.now(), // Use provided date or default to now
      });

      // Save the record to the database
      await newBuying.save();
    }

    res.status(201).json({
      success: true,
      message: 'Buying records created successfully',
    });
  } catch (error) {
    console.error('Error creating buying record:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const getAllBuyingUser = async (req, res) => {
  try {

    const buyingRecords = await Buying.find({})
      .populate({
        path: 'userId',
        select: 'email', 
      })
      .populate({
        path: 'productId',
        select: 'title price', // Fetch only the title and price fields from Product
      });

    // Format the data with defensive checks
    const formattedRecords = buyingRecords.map(record => {
      const userEmail = record.userId ? record.userId.email : 'N/A'; // Default value if userId is null
      const price = record.productId ? record.productId.price : 'N/A'; // Default value if productId is null
      const productTitle = record.productId ? record.productId.title : 'N/A'; // Default value if productId is null

      return {
        id: record._id,
        userEmail: userEmail,
        price: price,
        title: productTitle,
        date: record.date,
      };
    });

    res.status(200).json({
      success: true,
      buyingRecords: formattedRecords,
    });
  } catch (error) {
    console.error('Error fetching buying records:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const deleteBuyingById = async (req,res) => {
  try {
    const { id } = req.params;

    // Find and delete the record by ID
    const deletedRecord = await Buying.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Buying record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Buying record deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting buying record:',error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
