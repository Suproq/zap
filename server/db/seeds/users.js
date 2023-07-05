/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1, 
      nickname: 'supro', 
      password: '1234', 
      phone: '89005553535', 
      role: 1, 
      name: 'Вася', 
      surname: 'Пупкин', 
      address: null, 
      darktheme: true, 
    },
    {
      id: 2, 
      nickname: 'suproqqq', 
      password: '1231234', 
      phone: '89005553535', 
      role: 1, 
      name: 'Вася', 
      surname: 'Пупкин', 
      address: null, 
      darktheme: true, 
    }
  ]);
};
