const data = {
  teams: [
    { id: 1, name: "Toronto Light Salmons" },
    { id: 2, name: "Montréal Peach Puffs" },
    { id: 3, name: "Burlywood Bears" },
    { id: 4, name: "Cambridge Corn Silks" },
  ],
  players: [
    { id: 1, name: "Johnny Rocket", is_captain: false },
    {
      id: 2,
      name: "Susie Spinner",
      is_captain: true,
    },
    { id: 3, name: "Tam Herton", is_captain: false },
  ],
  quotes: [
    { id: 1, text: "Pass the rock!!", player_id: 1 },
    {
      id: 2,
      text: "Our strategy is to score more goalpoints than the opposing team.",
      player_id: 2,
    },
    {
      id: 3,
      text: "It's like the coach says, there's no 'w' in 'team'.",
      player_id: 2,
    },
  ],
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  const { players, quotes } = data;

  // Deletes ALL existing entries
  return knex("quote")
    .del()
    .then(() => {
      return knex("player").del();
    })
    .then(() => {
      return knex("player").insert(players)
    })
    .then(() => {
      return knex("quote").insert(quotes);
    })
};
