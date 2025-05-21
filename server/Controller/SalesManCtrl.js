const Salesman = require("../Models/SalesManModel");

const createSalesman = async (req, res) => {
  try {
    const {
      name,
      designation,
      mobile,
      email,
      city,
      address,
      alternateMobile,
      username,
      password,
    } = req.body;

    const photo = req.file ? req.file.filename : null;

    const newSalesman = new Salesman({
      name,
      designation,
      mobile,
      email,
      city,
      address,
      alternateMobile,
      username,
      password,
      photo,
    });

    await newSalesman.save();
    res.status(201).json({
      message: "Salesman created successfully",
      salesman: newSalesman,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Display = async (req, res) => {
  try {
    const Data = await Salesman.find();
    res.status(200).send({ Data });
    console.log(Data);
  } catch (error) {
    console.error("Error fetching Sales Man:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to fetch Data", error: error.message });
  }
};

module.exports = {
  createSalesman,
  Display,
};
