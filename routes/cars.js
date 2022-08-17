const express = require("express");
const router = express.Router();
// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
const Car = require("../models/Car");

// const DIR = './public/';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName)
//     }
// });

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         console.log(file);
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

router.get("/", async (req, res) => {
  try {
    const {
      make,
      model,
      minPrice,
      maxPrice,
      maxMileage,
      body,
      transmission,
    } = req.query;
    var searchQuery = {};
    if (make && !make.includes("Any")) {
      searchQuery.make = make;
    }
    if (model && !model.includes("Any")) {
      searchQuery.model = model;
    }
    if (minPrice && !minPrice.includes("price")) {
      searchQuery.price = { $gte: Number(minPrice) };
    }
    if (maxPrice && !maxPrice.includes("price") && maxPrice !== "0") {
      searchQuery.price = { ...searchQuery.price, $lte: Number(maxPrice) };
    }
    if (maxMileage && !maxMileage.includes("Any") && maxMileage !== "0") {
      searchQuery.milage = { $lte: Number(maxMileage) };
    }
    if (body && !body.includes("Any")) {
      searchQuery.body = body;
    }
    if (transmission && !transmission.includes("Any")) {
      searchQuery.transmition = transmission;
    }
    console.log(searchQuery);
    const cars = await Car.find(searchQuery); 
    console.log(cars);
    res.json(cars);
  } catch (err) {
    console.log("get car error:");
    console.log(err);
    res.json({ message: err });
  }
});

// router.post("/imageUpload", upload.array("carImg"), async (req, res) => {
//   const url = req.protocol + "://" + req.get("host");
//   const fileNames = req.files.map((file) => {
//     return url + "/public/" + file.filename;
//   });
//   res.send(fileNames);
// });

router.post("/add", async (req, res) => {
  try {
    //Car Model
    const car = new Car({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      fuel: req.body.fuel,
      engineSize: req.body.engineSize,
      transmition: req.body.transmition,
      body: req.body.body,
      milage: req.body.milage,
      colour: req.body.colour,
      doors: req.body.doors,
      seats: req.body.seats,
      bhp: req.body.bhp,
      description: req.body.description,
      price: req.body.price,
      carImg: req.body.carImg,
      features: req.body.features,
    });

    const savedCar = await car.save();
    res.json(savedCar);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/recentCars", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 }).limit(8);
    res.json(cars);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete Posting
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Car.deleteOne({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Mark Posting as sold
router.patch("/:postId", async (req, res) => {
  try {
    const updatePost = await Car.updateOne(
      { _id: req.params.postId },
      { $set: { sold: req.body.sold } }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const updatePost = await Car.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updatePost);
  } catch (err) {
    console.log("update error");
    console.log(err);
    res.json({ message: err });
  }
});

router.get("/getField", async (req, res) => {
  try {
    const fields = await Car.distinct(req.query.field);
    res.json(fields);
  } catch (err) {
    console.log("get field error:");
    console.log(err);
    res.json({ message: err });
  }
});

router.get("/getModelField", async (req, res) => {
  try {
    const fields =
      req.query.make && !req.query.make.includes("Any")
        ? await Car.distinct("model", { make: req.query.make })
        : await Car.distinct("model");
    res.json(fields);
  } catch (err) {
    console.log("get model field error:");
    console.log(err);
    res.json({ message: err });
  }
});

router.get("/getCarDetail", async (req, res) => {
  try {
    const car = await Car.findById(req.query.id);
    res.json(car);
  } catch (err) {
    console.log("get car detail error:");
    console.log(err);
    res.json({ message: err });
  }
});

module.exports = router;
