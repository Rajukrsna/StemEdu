
const Experiment = require("../models/Labs");
const router = require("express").Router();
const Latest = require("../models/CompletedLabs"); 

router.get("/experiments", async (req, res) => {
    try {
      const experiments = await Experiment.find();
      res.json(experiments);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch experiments" });
    }
  });
router.get("/glatest/:id", async (req, res) => { 
try{
  const latestExp = await Latest.find({user: req.params.id}).sort({timestamp: -1}).limit(1);
  res.json(latestExp);
}
catch(err){
  res.status(500).json({error: "Failed to fetch latest experiment"});
}
});

  router.get("/latest/:id", async (req, res) => {
    try {
      console.log("entereed ")
          console.log(req.params.id)  
      const latestExperiment = await Latest.find({user :req.params.id})
      console.log(latestExperiment)
      res.json(latestExperiment);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch latest experiment  " }); }
  })

  router.post("/save-progress", async (req, res) => {
    try{
      const {experimentName, duration,route, userId} = req.body;  
      console.log(req.body);
      const newCompletedLab = new Latest({
       name: experimentName,
        duration,
        route: route,
        user:userId
      })
      console.log(newCompletedLab); 
      await newCompletedLab.save(); 
      res.json({message: "Experiment progress saved successfully"})
    } catch (err) {
      res.status(500).json({ error: "Failed to save experiment progress" });

    } 


  })
  module.exports = router;