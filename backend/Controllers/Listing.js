const Listing = require("../Models/Listing");
const ListingModel = require("../Models/Listing");

const createPlace = async (req, res) => {
    console.log(req.body)
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
      listingPhotoPaths,
    } = req.body;

    console.log(typeof amenities);
    console.log(amenities);
    if (listingPhotoPaths.length==0) {
      return res.status(400).send("No file uploaded.");
    }
    

    const newListing = new ListingModel({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });
    await newListing.save();

    res.status(200).json(newListing);
  } catch (err) {
    res
      .status(300)
      .send({ message: "failed to create Listing", error: err.message });
  }
};

const getListingbycategory = async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings;

    if (qCategory) {
      listings = await ListingModel.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await ListingModel.find().populate("creator");
    }

    res.status(200).send(listings);
  } catch (err) {
    res
      .status(404)
      .send({ message: "failed to fetch listings", error: err.message });
    console.log(err);
  }
};
const getListingDetails = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await ListingModel.findById(listingId).populate("creator");
    res.status(200).send(listing);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getListingBySearch = async (req, res) => {
  const { search } = req.params;
  console.log(search);
  try {
    let listing = [];
    if (search === "all") {
      listing = await ListingModel.find().populate("creator");
    } else {
      listing = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }
    console.log(listing);
    res.status(200).send(listing);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = {
  createPlace,
  getListingbycategory,
  getListingDetails,
  getListingBySearch,
};
