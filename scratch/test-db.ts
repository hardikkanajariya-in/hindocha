import pg from "pg";
import "dotenv/config";

async function test() {
  const urls = [
    process.env.DATABASE_URL!,
    process.env.DATABASE_URL!.replace(":6432", ":5432")
  ];

  for (const url of urls) {
    console.log(`Testing connection to: ${url.split("@")[1]}`);
    const pool = new pg.Pool({ connectionString: url, connectionTimeoutMillis: 5000 });
    try {
      const res = await pool.query("SELECT NOW()");
      console.log(`✅ Success! Server time: ${res.rows[0].now}`);
      await pool.end();
      return; // Stop if one works
    } catch (err: any) {
      console.error(`❌ Failed: ${err.message}`);
    }
    await pool.end();
  }
}

test();
