const express = require('express');
const router = express.Router();

const Sunlight = require('./api_wrapper')
const sunlight= new Sunlight;


//get list of legislatures and output to page
router.get('/', (req, res) => {
  res.render('index')
});

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
      //console.log('memberssss', resolve);
      let passedMembers = resolve;
      res.render('reps', {passedMembers});
    })
  });
});

//get both member data
router.get('/member', (req, res, next) => {
  res.locals.id = req.query.id;
  sunlight.member(res.locals.id, (data) => {
    res.locals.target = new newMember(data.results[0]);
    next();
  });
});
//get data about passage votes
router.get('/member', (req, res, next) => {
  res.locals.bills = [];
  sunlight.votedBills(res.locals.id, (data) => {
    for(var i in data.results){
      billsData = new newBills(data.results[i]);        res.locals.bills.push(billsData)
    }
  next()
  });
});
//get summary of bill and pass all data to render
router.get('/member', (req, res, next) => {
  let count = 0;
  let total = res.locals.bills.length;
  if(total === 0){ //if api returns no data
    let target = res.locals.target;  //member
    let allBills = {noData: "Data not updated."}
    res.render('member', {target, allBills});
  }
  res.locals.bills.forEach((bill) => {
    sunlight.bills(bill.id, (data) => {
      let sum = data.results.find((billSum) => {
        return bill.id === billSum.bill_id;
      });
      bill.summary = sum.summary;
      count++
      if(count > total - 1 || res.locals.bills == []) {
        next()
      }
    }); //end sunlight.bills
  });//end forEach
});
router.get('/member', (req, res, next) => {
  let target = res.locals.target;  //member
  let allBills = res.locals.bills; //bills voted for
  res.render('member', {target, allBills});
});


//Create member object to push to currentMem in post function
function newMember(data){
   this.name = data.first_name + " " + data.last_name,
   this.party = data.party,
   this.chamber = data.chamber.charAt(0).toUpperCase() + data.chamber.slice(1),
   this.phone = data.phone,
   this.bioId = data.bioguide_id
};

////used to create object members to add to array
function newBills(data){
  this.id = data.bill_id,
  this.type = data.vote_type.charAt(0).toUpperCase() + data.vote_type.slice(1), //On Passage
  this.result = data.result,
  this.date = data.voted_at.slice(0, 10),
  govLink = data.bill_id.slice(0, data.bill_id.indexOf('-')),
  this.govTrack = `https://www.govtrack.us/congress/bills/115/${govLink}`
};


module.exports = router
