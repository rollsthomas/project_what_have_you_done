const request = require('request');
const baseUri = "https://congress.api.sunlightfoundation.com/";

const options = {
  url: ''
};

class Sunlight {
  //https://congress.api.sunlightfoundation.com/legislators/locate?zip=38563
  reps(zipcode, callback){
    this.sendRequest(`legislators/locate?zip=${zipcode}`, callback);
  }

  member(id, callback){
    this.sendRequest(`legislators?bioguide_id=${id}`, callback);
  }

  votedBills(id, callback){
      this.sendRequest(`votes?voter_ids.${id}__exists=true&question=On+Passage`, callback)
  }

  bills(id, callback){
    this.sendRequest(`bills?history.active=true&order=last_action_at&bill_id=${id}&fields=summary`, callback)
  }

  getPhoto(id, callback){
    options.url = `https://theunitedstates.io/images/congress/225x275/B001273.jpg`
    request(options, function(error, response, body){
      callback(body);
    });
  }

  sendRequest(url, callback){
    options.url = `${baseUri}${url}`;
    //console.log(options.url, 'URL');
    request(options, function(error, response, body){
      if(!error && response.statusCode == 200){
        //console.log(JSON.parse(body));
        callback(JSON.parse(body))
      } else{
        console.log("Error", error);
      }
    })
  }

}
//https://theunitedstates.io/images/congress/225x275/B001273.jpg
module.exports  = Sunlight

/*
profile(callback){
  this.sendRequest(`${this.user}`, callback)
}

sendRequest(url, callback){
  options.url = `${baseUri}${url}`;
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(JSON.parse(body));
      //console.log(JSON.parse(body))
    }else{
      console.log("ERROR", error);
    }
  })
}
*/

/*
function getUser(username){
  let user = new Githuh(username);
  return user;
};

function getRepos(user) {
  user.repo((data) => {
    console.log('\n Showing names of repos');
    console.log('==================');
    data.forEach((repo_obj) => console.log(repo_obj.name))
  })
}
====================================


router.get('/:number', (req, res) => {
  //res.locals.prompt = "Who is buried in Grant's tomb?";
  //res.locals.hint = "Think about whose tomb it is.";
  const name = req.cookies.username;
  const { side } = req.query;
  const { number } = req.params;
  const text = cards[number][side];
  const { hint } = cards[number];
  const templateData = {text, side, number, name};
  let link = req.baseUrl + '/' + number + '?';
  console.log(req.originalUrl);
  //adds hint if it is a question
  if(side === "question"){
    templateData.hint = hint;
    templateData.link = link.concat('side=answer');
    templateData.side = 'answer'}
  else if (side === "answer") {
    templateData.link = link.concat('side=question');
    templateData.side = 'question';}
  else if (side == 'next'){
    //for next card button
    let num = parseInt(number);
    if(num < cards.length - 1){
      num = num + 1;
      return res.redirect(`/cards/${num}?side=question`)}
    else{
      return res.redirect(`/cards/0?side=question`)}
  }
  else if (!side || side != "questions" || side != "answers") {
    //if there are no side value in query string or wrong side value
    return res.redirect('/cards/' + number + "?side=question");}
  res.render('card', templateData);//{
    //prompt: cards[req.params.number].question,
    //hint: cards[req.params.number].hint
  //});
});
*/
