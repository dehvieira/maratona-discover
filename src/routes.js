const express = require('express'); //lib express
const routes = express.Router(); //criando rotas

const views = __dirname + '/views/';

const Profile = {
  data: {
    name: 'André Vieira',
    avatar: 'https://www.github.com/dehvieira.png',
    'monthly-budget': 3000,
    'hours-per-day': 6,
    'days-per-week': 5,
    vacation: 4,
    'value-hour': 75,
  },

  controllers: {
    index(req, res) {
      return res.render(views + 'profile', { profile: Profile.data });
    },

    update(req, res) {
      // req.body para pegar os dados
      const data = req.body;

      // definir quantas semanas tem o ano
      const weeksPerYear = 52;

      // remover as semanas de férias do ano, paga pegar
      //quantas semana tem em 1 mes
      const weeksPerMonth = (weeksPerYear - data.vacation) / 12;

      //total de horas trabalhadas na semana
      const weekTotalHours = data['hours-per-day'] * data['days-per-week'];

      // horas trabalhadas no mes
      const monthlyTotalHors = weekTotalHours * weeksPerMonth;

      //qual será o valor da minha hora
      const valueHour = data['monthly-budget'] / monthlyTotalHors;

      Profile.data = {
        ...Profile.data,
        ...req.body,
        'value-hour': valueHour,
      };
      return res.redirect('/profile');
    },
  },
};

const Job = {
  data: [
    {
      id: 1,
      name: 'Pizzaria Xpress',
      'daily-hours': 2,
      'total-hours': 30,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: 'Fagulha Fire',
      'daily-hours': 3,
      'total-hours': 25,
      created_at: Date.now(),
    },
  ],

  controllers: {
    index(req, res) {
      //ajustes no jobs
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';

        return {
          ...job,
          remaining,
          status,
          budget: Profile.data['value-hour'] * job['total-hours'],
        };
      });

      return res.render(views + 'index', { jobs: updatedJobs });
    },

    create(req, res) {
      return res.render(views + 'job');
    },

    save(req, res) {
      //{ name: 'teste', 'daily-hours': '4', 'total-hours': '10' }
      const lastId = Job.data[Job.data.length - 1]?.id || 1;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        created_at: Date.now(), //atribindo data de hoje
      });
      return res.redirect('/');
    },
    show(req, res) {
      const jobId = req.params.id;

      const job = Job.data.find((job) => job.id === jobId);

      return res.render(views + 'job-edit', { job });
    },
  },

  services: {
    remainingDays(job) {
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();

      const createdDate = new Date(job.created_at);
      const dueDay = createdDate.getDate() + Number(remainingDays);
      const dueDateInMS = createdDate.setDate(dueDay);

      const timeDifInms = dueDateInMS - Date.now();

      //transformar milli em dias

      const dayinMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor(timeDifInms / dayinMs);

      //restam X dias
      return dayDiff;
    },
  },
};

//request,result
routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/:id', Job.controllers.show);
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;
