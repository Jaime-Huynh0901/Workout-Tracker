const path = require("path");

module.exports = app => {
  // Called when "Countinue Workout" or "new Workout" is clicked in index.html
  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });
  
  app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });
};