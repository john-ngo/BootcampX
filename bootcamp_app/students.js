const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2] || 'FEB';
const limit = process.argv[3] || 5;
const values = [`%${cohort}%`, limit];

const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      onsole.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
    })
  });