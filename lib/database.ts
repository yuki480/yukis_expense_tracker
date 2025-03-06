import {neon} from "@neondatabase/serverless"

const sql = neon("postgresql://blehh_owner:npg_JBTl6pS7gGCV@ep-wild-snowflake-a51jj2x1-pooler.us-east-2.aws.neon.tech/blehh?sslmode=require")

export async function loadAllEvents() {
    const result = await sql("select * from events");
    return result
}