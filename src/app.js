const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repos = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repos)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes : 0 
  };

  repos.push(repo)

  return response.status(200).json(repo)

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title, url, techs} = request.body;
  const repoIndex = repos.findIndex(repo => repo.id === id);

  if (repoIndex < 0 ){
      return response.status(400).json({error:'Project not found.'})
  }

  const repo = repos[repoIndex] 
  repo.title = title 
  repo.url = url
  repo.techs = techs
 
  repos[repoIndex] = repo

  return response.json(repo) ;
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
  const repoIndex = repos.findIndex(repo => repo.id === id);

  if (repoIndex < 0 ){
      return response.status(400).json({error:'Project not found.'})
  }

  repos.splice(repoIndex,1) 
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params
  const repoIndex = repos.findIndex(repo => repo.id === id);

  if (repoIndex < 0 ){
      return response.status(400).json({error:'Project not found.'})
  }

  repos[repoIndex].likes ++
 

  return response.json(repos[repoIndex]) ;
});

module.exports = app;
