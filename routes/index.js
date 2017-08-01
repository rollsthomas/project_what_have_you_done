const express = require('express');
const router = express.Router();

const Sunlight = require('./api_wrapper')
const sunlight= new Sunlight;


//get list of legislatures and output to page
router.get('/', (req, res) => {
  res.render('index')

})

router.post('/reps', (req, res, body) => {
  let zipcode = req.body.zipcode;
  let members = [];

  sunlight.reps(zipcode, (data) => {
    return new Promise((resolve, reject) => {
      //created array of data from members from district
      for(var i in data.results){
        let currentMem = new newMember(data.results[i]);
        members.push(currentMem)
      }
      resolve(members);
    }).then((resolve) => {
      let passedMembers = resolve;
      res.render('reps', {passedMembers});
    }).catch((err) => {
      console.log('ERRONEOUS', err);
    });
  })
  console.log('memberssss', members);
})

//Create member object to push to currentMem in post function
function newMember(data){
   this.name = data.first_name + " " + data.last_name,
   this.party = data.party,
   this.chamber = data.chamber,
   this.phone = data.phone
   console.log(this.chamber);
}



module.exports = router
