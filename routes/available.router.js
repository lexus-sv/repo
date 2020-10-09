const {Router} = require("express");
const Bicycle = require("../model/Bicycle");

const router = Router();

router.get("/availablebikes", async(req, res)=>{
    try{
        const bikes = await Bicycle.find({rent: false});
        res.json(bikes);
    }catch (e){
        res.status(500).json({message: `Some error, try again`});
    }
});

router.delete("/deleteBike", async(req, res)=>{
    Bicycle.findByIdAndRemove(req.body.id, { useFindAndModify: true })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Bicycle with id=${id}. Maybe Bicycle was not found!`
                });
            } else {
                res.send({
                    message: "Bicycle was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Bicycle with id=" + id
            });
        });
});

router.put("/rentingBike", async(req, res)=>{
    Bicycle.findByIdAndUpdate(req.body.id, {rent: true, rent_hours: req.body.rideHours},{ useFindAndModify: true })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Bicycle with id=${id}. Maybe Bicycle was not found!`
                });
            } else {
                res.send({
                    message: "Bicycle was update successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not update Bicycle with id=" + id
            });
        });
});

module.exports = router;