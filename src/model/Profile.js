const Database = require("../db/config");

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.get(`SELECT * FROM  profile`);

    await db.close();

    return {
      name: data.name,
      avatar: data.avatar,
      monthly_budget: data.monthly_budget,
      days_per_week: data.days_per_week,
      "hours-per-day": data.hours_per_day,
      vacation: data.vacation,
      "value-hour": data.value_hour,
    };
  },

  async update(newData) {
    const db = await Database();

    db.run(`UPDATE profile SET
    name = "${newData.name}",
    avatar = "${newData.avatar}",
    monthly_budget = ${newData["monthly-budget"]},    
    days_per_week = ${newData["days-per-week"]},
    hours_per_day = ${newData["hours-per-day"]},
    vacation = ${newData.vacation},
    value_hour = ${newData["value-hour"]}
    `);

    await db.close();
  },
};
