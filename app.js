// require('dotenv').load();

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    knex = require('./db/knex.js')
    // routeMiddleware = require('./middleware/routeHelper');


app.set('view engine', 'pug');
app.use(methodOverride('_method'));
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

//******************* Home ****************************

app.get('/', (req, res) => {
    knex('collections')
        .select("name")
        .limit(5)
        .orderBy('updated_at', 'asc')
        .then(collections => {
            console.log(collections)
            knex('poems')
                .select('title', 'collection_name')
                .limit(5)
                .orderBy('updated_at', 'asc')
                .then(poems => res.render('home', {collections, poems}) )
        })
})

// Todo - make a collections page that links to indiviual collections (currently /poems)

app.get('/collections', (req, res) => {
    res.render('poems/new')
})

app.get('/poems', (req, res) => {
    knex('poems')
        .select('*')
        .orderBy('title', 'asc')
        .then(poems => res.render('poems/index', {poems}) )
})

app.get('/collections/poems', (req, res) => {
    knex('poems')
        .where('title', req.query.title)
        .select('*')
        .first()
        .then((poem) => {
            knex('lines')
                .where('poem_title', poem.title)
                .select('*')
                .then(lines => res.render('poems/show', {poem, lines}) )
        })
})


// app.get('/poems/new', (req, res) => {
//     res.render('new')
// })

// app.post('/poems', (req, res) => {
//     console.log(req.body)
// })







//******************* Teams ****************************

//Index
app.get('/teams', function(req, res) {
  db.Team.find({})
    .populate('owner')
    .exec(function(err, teams) {
      res.render('teams/index', {teams: teams, isLoggedIn: req.user})
    })
})

//New

app.get('/teams/new', function(req, res) {
  res.render('teams/new', {isLoggedIn: req.user._id});
})

//Show

app.get('/teams/:id', function(req, res) {
  db.Team.findById(req.params.id)
    .populate('players')
    .exec(function(err, team) {
      if(req.user === undefined) {
        req.user = {_id: 'a'}
      } 
      res.render('teams/show', {team: team, isLoggedIn: req.user})
    })
})

//Create

app.post('/teams', function(req, res) {
  db.Team.create(req.body, function(err, team) {
    if(err) console.log(err);
    team.owner = req.user._id;
    team.save();
    db.User.findById(req.user._id, function(err, user) {
      user.teams.push(team);
      user.save();
      res.format({
        'text/html': function(){
          //this may be horribly wrong should check over
          res.redirect('/teams/' + team._id + '/players')
        },

        'application/json': function(){
          res.send({ team: team });
        },
        'default': function() {
          // log the request and respond with 406
          res.status(406).send('Not Acceptable');
        }
      });
      
    })
  })
})

//Edit

app.get('/teams/:id/edit', function(req, res) {
  db.Team.findById(req.params.id, function(err, team) {
    res.render('teams/edit', {team: team})
  })
})

//Update

app.put('/teams/:id', function(req, res) {
  db.Team.findByIdAndUpdate(req.params.id, req.body.team, function(err, team) {
    res.redirect('/teams/' + req.params.id)
  })
})

//Destroy

app.delete('/teams/:id', function(req, res) {
  
  db.Team.findByIdAndRemove(req.params.id, function(err, team) {
    if(err) console.log(err)
    res.redirect('/teams');
  })
})

//******************* Players ****************************

//Index

//New

app.get('/teams/:id/players/new', function(req, res) {
  db.Team.findById(req.params.id, function(err, team) {
    res.render('players/new', {team: team})    
  })

})

//Show

app.get('/players/:id', function(req, res) {
  db.Player.findById(req.params.id)
    .populate('team')
    .exec(function(err, player) {
      if(err) console.log(err);
      res.format({
        'text/html': function(){
          if(req.user === undefined) {
            req.user = {_id: ''}
          }
          res.render('players/show', {player: player, isLoggedIn: req.user._id})
        },

        'application/json': function(){
          res.send({ player: player });
        },
        'default': function() {
          // log the request and respond with 406
          res.status(406).send('Not Acceptable');
        }
      });
      
    })
})

//Create

app.post('/teams/:id/players', function(req, res) {
  db.Player.create(req.body, function(err, player) {
    if(err) console.log(err)
    player.owner = req.user._id;
    player.team = req.params.id;
    player.save();
    db.Team.findById(req.params.id, function(err, team) {
      if(err) console.log(err);
      team.players.push(player);
      team.save();
      db.User.findById(req.user._id, function(err, user) {
        if(err) console.log(err);
        user.players.push(player);
        user.save()
        res.format({
          'text/html': function(){
            //this may be horribly wrong should check over
            res.render('/teams/show', {team: team});
          },

          'application/json': function(){
            res.send({ player: player });
          },
          'default': function() {
            // log the request and respond with 406
            res.status(406).send('Not Acceptable');
          }
        });
      })
    })
  })
})

//Edit

//Update

//Destroy

app.delete('/players/:id', function(req, res) {
  db.Player.findByIdAndRemove(req.params.id)
    .populate('team')
    .exec(function(err, player) {
      if(err) console.log(err);
      res.redirect('/teams/' + player.team._id)
    })
})


//Catch All

app.get('*', function(req,res){
  res.render('404');
});










app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on port 3000')
})
