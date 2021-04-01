const express = require('express') //lib express 
const routes = express.Router() //criando rotas

const views = __dirname + "/views/"

const profile = {
  name: "André Vieira",
  avatar: "https://avatars.githubusercontent.com/u/27936380?s=400&u=a9f9fdb7020eeabd84c2ab1bbfb598216a4e99c4&v=4",
  "monthly-budget": 3000,
  "hours-per-day": 6,
  "days-per-week": 5,
  "vacation": 4
}

//request,result
routes.get('/', (req,res) => res.render(views+ "index"))
routes.get('/job', (req,res) => res.render(views+ "job"))
routes.get('/job/edit', (req,res) => res.render(views +"job-edit"))
routes.get('/profile', (req,res) => res.render(views + "profile", {profile}))



module.exports = routes;