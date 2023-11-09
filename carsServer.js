var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var port = process.env.PORT||2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
let cars = [
  {
    id: "ABR12",
    price: 400000,
    year: 2015,
    kms: 25000,
    model: "Swift Dzire VXi",
    color: "White",
  },
  {
    id: "CBN88",
    price: 480000,
    year: 2012,
    kms: 75000,
    model: "Etios SMi",
    color: "Steel Grey",
  },
  {
    id: "XER34",
    price: 300000,
    year: 2013,
    kms: 55000,
    model: "City AXi",
    color: "Metallic Blue",
  },
  {
    id: "MPQ29",
    price: 400000,
    year: 2015,
    kms: 25000,
    model: "Swift DXi",
    color: "Black",
  },
  {
    id: "PYQ88",
    price: 480000,
    year: 2012,
    kms: 75000,
    model: "Etios VXi",
    color: "White",
  },
  {
    id: "DFI61",
    price: 300000,
    year: 2013,
    kms: 55000,
    model: "City ZXi",
    color: "Red",
  },
  {
    id: "JUW88",
    price: 400000,
    year: 2015,
    kms: 25000,
    model: "Swift Dzire VXi",
    color: "White",
  },
  {
    id: "KPW09",
    price: 285000,
    year: 2012,
    kms: 76321,
    model: "Swift Dzire VXi",
    color: "White",
  },
  {
    id: "NHH09",
    price: 725000,
    year: 2018,
    kms: 15000,
    model: "City ZXi",
    color: "Silver Grey",
  },
  {
    id: "CTT26",
    price: 815000,
    year: 2016,
    kms: 42500,
    model: "City AXi",
    color: "Metallic Blue",
  },
  {
    id: "VAU55",
    price: 345000,
    year: 2014,
    kms: 81559,
    model: "Swift DXi",
    color: "Red",
  },
  {
    id: "BTR31",
    price: 184000,
    year: 2011,
    kms: 120833,
    model: "Etios VXi",
    color: "Silver Grey",
  },
];
let carMaster = [
  {
    model: "Swift Dzire VXi",
    make: "Maruti",
    fuel: "Diesel",
    colors: ["White", "Silver Grey", "Metallic Blue", "Red"],
    type: "Sedan",
    transmission: "Manual",
  },
  {
    model: "Etios SMi",
    make: "Toyota",
    fuel: "Diesel",
    colors: ["White", "Steel Grey", "Black"],
    type: "Hatchback",
    transmission: "Manual",
  },
  {
    model: "City AXi",
    make: "Honda",
    fuel: "Petrol",
    colors: ["Silver Grey", "Metallic Blue"],
    type: "Sedan",
    transmission: "Automatic",
  },
  {
    model: "Swift DXi",
    make: "Maruti",
    fuel: "Diesel",
    colors: ["White", "Red", "Black"],
    type: "Hatchback",
    transmission: "Manual",
  },
  {
    model: "Etios VXi",
    make: "Toyota",
    fuel: "Diesel",
    colors: ["White", "Silver Grey", "Black"],
    type: "Sedan",
    transmission: "Manual",
  },
  {
    model: "City ZXi",
    make: "Honda",
    fuel: "Petrol",
    colors: ["Silver Grey", "Metallic Blu"],
    type: "Sedan",
    transmission: "Manual",
  },
];
app.get("/cars", function (req, res) {
  let arr1 = cars;
  let minprice = +req.query.minprice;
  let maxprice = +req.query.maxprice;
  let fuel = req.query.fuel;
  let type = req.query.type;
  let sort = req.query.sort;

  if (minprice) {
    arr1 = arr1.filter((p) => p.price >= minprice);
  }
  if (maxprice) {
    arr1 = arr1.filter((p) => p.price <= maxprice);
  }
  if (fuel) {
    arr1 = arr1.filter((p) => {
      const car = carMaster.find((car) => car.model === p.model);
      if (car) {
        return car.fuel === fuel;
      }
    });
  }
  if (type) {
    arr1 = arr1.filter((p) => {
      const car = carMaster.find((car) => car.model === p.model);
      if (car) {
        return car.type === type;
      }
    });
  }
  if (sort) {
    if (sort === "kms") {
      arr1.sort((st1, st2) => st1.kms - st2.kms);
    }
    if (sort === "price") {
      arr1.sort((st1, st2) => st1.price - st2.price);
    }
    if (sort === "year") {
      arr1.sort((st1, st2) => st1.year - st2.year);
    }
  }
  res.send(arr1);
});

app.post("/car", function (req, res) {
  let body = req.body;
  cars.push(body);
  res.send(body);
});

app.put("/car/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  let index = cars.findIndex((c) => c.id === id);
  if (index >= 0) {
    cars[index] = body;
    res.send(body);
  } else {
    res.status(404).send("No Car found");
  }
});

app.get("/cars/:id", function (req, res) {
  let id = req.params.id;
  let car = cars.find((c) => c.id === id);
  if (car) {
    res.send(car);
  } else {
    res.status(404).send("Car with ID " + id + " not found.");
  }
});

app.delete("/car/:id", function (req, res) {
  let id = req.params.id;
  let index = cars.findIndex((st) => st.id === id);
  if (index >= 0) {
    let deletedCar = cars.splice(index, 1);
    res.send(deletedCar);
  } else res.status(404).send("NO Car found");
});

app.get("/carmaster", function (req, res) {
  let arr1 = carMaster;
  res.send(arr1);
});
