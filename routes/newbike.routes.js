const {Router} = require("express");
const Bicycle = require("../model/Bicycle");
const router = Router();

router.post("/newbike", async(req, res)=>{
   try {
       const {bike_name, bike_type, bike_price} = req.body;
       const rent = false;

       console.log("SERVER:",bike_name, bike_type, bike_price, rent);

       const newbike = await Bicycle.findOne({bike_name});

       if(newbike){
           return res.status(400).json({message:"Same name is used"});
       }
       const bike = new Bicycle({bike_name, bike_type, bike_price, rent});

       await bike.save();

       res.status(201).json({bike});
   }catch (e){
       res.status(500).json({message: `Some error, try again`});
   }
});

module.exports = router;