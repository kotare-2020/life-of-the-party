exports.seed = (knex, Promise) => {
  return knex("players").insert([
    { id: 1, player: "Fai" },
    { id: 2, player: "George" },
    { id: 4, player: "Joe" },
    { id: 5, player: "Richard" },
    { id: 6, player: "Jefferson" },
    { id: 7, player: "Marta" },
    { id: 8, player: "Aisyah" },
    { id: 9, player: "Rose" },
    { id: 10, player: "Ben M." },
    { id: 11, player: "Ben I." },
    { id: 12, player: "Jayden" },
    { id: 13, player: "Andy" },
    { id: 14, player: "Derek" },
    { id: 15, player: "Rubin" },
  ]);
};
