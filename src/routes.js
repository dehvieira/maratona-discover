const express = require('express'); //lib express
const routes = express.Router(); //criando rotas

const views = __dirname + '/views/';

const profile = {
  name: 'André Vieira',
  avatar: 'https://www.github.com/dehvieira.png',
  'monthly-budget': 3000,
  'hours-per-day': 6,
  'days-per-week': 5,
  vacation: 4,
  'value-hour': 75,
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
          budget: profile['value-hour'] * job['total-hours'],
        };
      });

      return res.render(views + 'index', { jobs: updatedJobs });
    },

    create(req, res) {
      //{ name: 'teste', 'daily-hours': '4', 'total-hours': '10' }
      const lastId = Job.data[Job.data.length - 1]?.id || 1;

      jobs.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        created_at: Date.now(), //atribindo data de hoje
      });
      return res.redirect('/');
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

routes.get('/job', (req, res) => res.render(views + 'job'));
routes.post('/job', Job.controllers.create);

routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'));
routes.get('/profile', (req, res) =>
  res.render(views + 'profile', { profile }),
);

module.exports = routes;
