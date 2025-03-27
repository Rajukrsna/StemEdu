
const Experiment = require("../models/Labs");
const router = require("express").Router();
const Latest = require("../models/CompletedLabs"); 
const User = require("../models/User"); 
const UserProgress = require("../models/TrackProgress");

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
     // console.log("entereed ")
      //    console.log(req.params.id)  
      const latestExperiment = await Latest.find({user :req.params.id})
    ////  console.log(latestExperiment)
      res.json(latestExperiment);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch latest experiment  " }); }
  })

  router.post("/save-progress", async (req, res) => {
    try{
      const {experimentName, duration,route, userId, track} = req.body;  
     // console.log(req.body);
      const newCompletedLab = new Latest({
       name: experimentName,
        duration,
        route: route,
        user:userId
      })
      //console.log(newCompletedLab); 
const user = await User.findById(userId);
   // Ensure the specific track exists in XP
   if (!user.xp[track]) {
    user.xp[track] = 0; // Initialize XP for the track if it doesn't exist
  }

  // Update XP for the respective track
  user.xp[track] += 45;
// console.log(user)
await user.save();  
//console.log(user.xp);
      await newCompletedLab.save(); 
      res.json({message: "Experiment progress saved successfully"})
    } catch (err) {
      res.status(500).json({ error: "Failed to save experiment progress" });

    } 
  })

//send user data
  router.get("/progress/:id",async (req, res) => {
    try {
      const users = await User.find({_id: req.params.id});
     // console.log(users);
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch progress" });
  }
}
  )

  router.get("/getUsers", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  

  module.exports = router;