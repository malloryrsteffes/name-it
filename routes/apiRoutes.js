var db = require("../models");

module.exports = function(app) {
  // Selects 2000 boy names by the first letter
  app.get("/api/boy/:letter", function(req, res) {
    console.log("boy letter route hit");

    db.Baby.findAll({
      limit: 2000
      // where: {
      //   name: req.params.name
      // }
    }).then(function(Baby) {
      console.log("looking for Baby");
      res.json(Baby);

      var letter = req.params.letter.toUpperCase();

      var targetedNames = [];

      console.log(letter);

      // Function targets specific boy names by first letter and randomly selects one to send to cilent
      function firstLetter() {
        for (i = 0; i < Baby.length; i++) {
          if (Baby[i].name.charAt(0) === letter && Baby[i].gender === "MALE") {
            targetedNames.push(Baby[i].name);
          }
        }
        var picker = Math.floor(Math.random() * targetedNames.length) + 1;
        console.log(targetedNames[picker]);
        res.json(targetedNames[picker]);
      }

      firstLetter();

      // console.table(Baby[0].name);
      // console.log(Baby[0].name);
    });
  });

  // Selects 2000 girl names by the first letter
  app.get("/api/girl/:letter", function(req, res) {
    console.log("girl first letter route hit");

    db.Baby.findAll({
      limit: 2000
      // where: {
      //   name: req.params.name
      // }
    }).then(function(Baby) {
      console.log("looking for Baby");

      var letter = req.params.letter.toUpperCase();

      var targetedNames = [];

      console.log(letter);

      // Function targets specific girl names by first letter and randomly selects one to send to cilent
      function firstLetter() {
        for (i = 0; i < Baby.length; i++) {
          if (Baby[i].name.charAt(0) === letter && Baby[i].gender === "FEMALE") {
            targetedNames.push(Baby[i].name);
          }
        }
        var picker = Math.floor(Math.random() * targetedNames.length) + 1;
        console.log(targetedNames[picker]);
        res.json(targetedNames[picker]);
      }

      firstLetter();

    });
  });

  // Randomizer grabs a random boy or girl name based on the route
  app.get("/api/randomizes/:gender", function(req, res) {
    console.log("randomizes route hit");

    db.Baby.findAll({
      limit: 2000
      // where: {
      //   name: req.params.name
      // }
    }).then(function(Baby) {
      // res.json(Baby);

      var gender = req.params.gender;

      // Function sets a conditional when user chooses between a boy and a girl
      function genderName() {
        if(gender === "boy") {
          boyRandomize();
        } else if(gender === "girl") {
          girlRandomize();
        } else {
          randomizes();
        }
      }

      // Function targets random boy names
      function boyRandomize() {
        var babyBoyNames = [];

        for (i = 0; i < Baby.length; i++) {

          if(Baby[i].gender === "MALE") {
            babyBoyNames.push(Baby[i].name)
          }
        }

        var picker = Math.floor(Math.random() * babyBoyNames.length) + 1;

        console.log(`\nLooking for Baby Boy names`);
        console.log(`\nHow do you like ${babyBoyNames[picker]}?\n`);
        res.json(babyBoyNames[picker])
      }

      // Function targets random girl names
      function girlRandomize(){
        var babyGirlNames = [];

        for (i = 0; i < Baby.length; i++) {
          //console.log(Baby[i].gender, Baby[i].name);

          if(Baby[i].gender === "FEMALE") {
            babyGirlNames.push(Baby[i].name)
          }
        }

        var picker = Math.floor(Math.random() * babyGirlNames.length) + 1;

        console.log(`\nLooking for Baby Girl names`);
        console.log(`\nHow do you like ${babyGirlNames[picker]}?\n`);
        res.json(babyGirlNames[picker]);
      }

      // Function targets a random name regardless of boy or girl
      function randomizes() {

        var picker = Math.floor(Math.random() * Baby.length) + 1;
        console.log(`\nLooking for Baby name`);
        console.log(`\nHow do you like ${Baby[picker].name}?\n`);
        res.json(Baby[picker])
      }

      genderName();
    });
  });

  // Selects a random pet name
  app.get("/api/pet", function(req, res) {
    console.log("pets route hit");

    db.Pet.findAll({})
    .then(function(Pet) {

      function randomizes() {

        var picker = Math.floor(Math.random() * Pet.length) + 1;
        console.log(`\nLooking for pet name`);
        console.log(`\nHow do you like ${Pet[picker].name}?\n`);
        res.json(Pet[picker].name);
      }

      randomizes();

    });
  });

  // Selects a random boat name
  app.get("/api/boat", function(req, res) {
    console.log("boat route hit");

    db.Boat.findAll({})
    .then(function(Boat) {

      function randomizes() {

        var picker = Math.floor(Math.random() * Boat.length) + 1;
        console.log(`\nLooking for boat name`);
        console.log(`\nHow do you like ${Boat[picker].name}?\n`);

        res.json(Boat[picker].name)

      }

      randomizes();

    });
  });


  app.get("/api/ducky", function(req, res) {
    console.log("ducky route hit");

    db.Ducky.findAll({})

    .then(function(Ducky) {

      function randomizes() {

        var picker = Math.floor(Math.random() * Ducky.length) + 1;

        console.log(`\nLooking for ducky name`);

        console.log(`\nHow do you like ${Ducky[picker].name}?\n`);

        res.json(Ducky[picker].name)

      }

      randomizes();

    });
  });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

};
