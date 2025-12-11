const { execSync } = require('child_process');

console.log('=== Setting up medusa_ecommerce database ===\n');

const dbConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres' // Connect to default postgres database first
};

const createDbCommand = `"C:\\Program Files\\PostgreSQL\\16\\bin\\createdb.exe" -U postgres -h localhost medusa_ecommerce`;
const sqlCommand = `"C:\\Program Files\\PostgreSQL\\16\\bin\\psql.exe" -U postgres -h localhost -d medusa_ecommerce -f "../init-db.sql"`;

try {
  console.log('Step 1: Creating database medusa_ecommerce...');
  try {
    execSync(createDbCommand, {
      stdio: 'inherit',
      env: { ...process.env, PGPASSWORD: 'postgres' }
    });
    console.log('✓ Database created successfully\n');
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('! Database already exists (this is okay)\n');
    } else {
      throw error;
    }
  }

  console.log('Step 2: Installing PostgreSQL extensions...');
  execSync(sqlCommand, {
    stdio: 'inherit',
    env: { ...process.env, PGPASSWORD: 'postgres' }
  });
  console.log('\n✓ Extensions installed successfully');

  console.log('\n=== Database setup complete! ===');
  console.log('Database: medusa_ecommerce');
  console.log('Host: localhost:5432');
  console.log('User: postgres\n');
} catch (error) {
  console.error('Error setting up database:', error.message);
  process.exit(1);
}
