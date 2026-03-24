require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI);

// 💻 PRODUCTS DATA (YOUR DATA ADDED ✅)
const products = [
  {
    name: "Dell XPS 13 Plus",
    brand: "Dell",
    price: 135000,
    image: "https://images.unsplash.com/photo-1587202372775-989d9d0c89b1",
    features: "12th Gen Intel i7, 16GB RAM, 512GB SSD, 13.4 OLED Display, Windows 11"
  },
  {
    name: "Apple MacBook Air M2",
    brand: "Apple",
    price: 150000,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    features: "Apple M2 Chip, 8GB RAM, 256GB SSD, Retina Display, macOS"
  },
  {
    name: "HP Spectre x360",
    brand: "HP",
    price: 145000,
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
    features: "Intel i7, 16GB RAM, 1TB SSD, 13.5 Touch, 2-in-1 Convertible"
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    price: 160000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    features: "Intel i7, 16GB RAM, 512GB SSD, 14 FHD, Business Laptop"
  },
  {
    name: "Asus ROG Zephyrus G14",
    brand: "Asus",
    price: 140000,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    features: "Ryzen 9, 16GB RAM, RTX 4060, 1TB SSD, Gaming Laptop"
  },
  {
    name: "Acer Predator Helios 300",
    brand: "Acer",
    price: 125000,
    image: "https://images.unsplash.com/photo-1587614382346-ac0c1b2d4f05",
    features: "Intel i7, 16GB RAM, RTX 3060, 512GB SSD, 144Hz Display"
  },
  {
    name: "MSI Katana GF66",
    brand: "MSI",
    price: 110000,
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    features: "Intel i7, 16GB RAM, RTX 3050, 512GB SSD, Gaming Laptop"
  },
  {
    name: "Samsung Galaxy Book3 Pro",
    brand: "Samsung",
    price: 120000,
    image: "https://images.unsplash.com/photo-1527430253228-e93688616381",
    features: "Intel i5, 16GB RAM, 512GB SSD, AMOLED Display, Slim Design"
  },
  {
    name: "LG Gram 16",
    brand: "LG",
    price: 130000,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    features: "Intel i7, 16GB RAM, 1TB SSD, Ultra Lightweight, 16 Display"
  },
  {
    name: "Microsoft Surface Laptop 5",
    brand: "Microsoft",
    price: 140000,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef",
    features: "Intel i7, 16GB RAM, 512GB SSD, Touchscreen, Premium Build"
  }
];

// 👤 SEED FUNCTION
const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const hashed = await bcrypt.hash("1234", 10);

    // 👑 ADMIN
    const admin = new User({
      username: "admin",
      email: "admin@smarttech.com",
      password: hashed,
      role: "admin"
    });

    // 👤 USER
    const user = new User({
      username: "user",
      email: "user@smarttech.com",
      password: hashed
    });

    await admin.save();
    await user.save();

    await Product.insertMany(products);

    console.log("✅ Database Seeded Successfully!");
    console.log("👑 Admin: admin / 1234");
    console.log("👤 User: user / 1234");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();