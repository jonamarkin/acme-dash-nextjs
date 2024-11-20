import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { invoices, customers, revenue, users } from "../lib/placeholder-data";
import { list } from "postcss";

const client = await db.connect();

/*
Let's execute a query to make sure everything is working as expected. We'll use another Router Handler, query/route.ts, to query the database. Inside this file, you'll find a listInvoices() function that has the following SQL query.


SELECT invoices.amount, customers.name
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
WHERE invoices.amount = 666;

*/

async function listInvoices() {
  try {
    const invoices = await client.query(
      `SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;`
    );

    return invoices.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function GET() {
  // return Response.json({
  //   message:
  //     "Uncomment this file and remove this line. You can delete this file when you are finished.",
  // });
  try {
    const inv = await listInvoices();

    //Return the invoices
    return Response.json({ inv });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
