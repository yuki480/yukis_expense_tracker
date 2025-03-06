import NextAuth from "next-auth"
import NeonAdapter from "@auth/neon-adapter"
import {Pool} from "@neondatabase/serverless"
 
const dbUrl = process.env.DATABASE_URL!;

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
    const pool = new Pool({connectionString: dbUrl})
    return {
        providers: [  ],
        adapter: NeonAdapter(pool)
      }
})