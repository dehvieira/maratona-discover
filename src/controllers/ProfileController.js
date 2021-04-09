const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
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
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    // horas trabalhadas no mes
    const monthlyTotalHors = weekTotalHours * weeksPerMonth;

    //qual será o valor da minha hora
    const valueHour = data["monthly-budget"] / monthlyTotalHors;

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour,
    });

    return res.redirect("/profile");
  },
};
