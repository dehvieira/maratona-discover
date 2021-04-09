let data = {
  name: "André Vieira",
  avatar: "https://www.github.com/dehvieira.png",
  "monthly-budget": 3000,
  "hours-per-day": 6,
  "days-per-week": 5,
  vacation: 4,
  "value-hour": 75,
};

module.exports = {
  get() {
    return data;
  },

  update(newData) {
    data = newData;
  },
};
