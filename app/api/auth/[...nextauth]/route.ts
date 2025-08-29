import NextAuth, { type NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { allowedAgentIds, normalizeAgentId } from "@/lib/agents"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

const useDb = Boolean(process.env.DATABASE_URL)

export const authOptions: NextAuthOptions = {
  adapter: useDb ? (PrismaAdapter(prisma) as any) : undefined,
  session: { strategy: useDb ? "database" : "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email) return null
        const inputId = normalizeAgentId(credentials.email.includes("@") ? credentials.email.split("@")[0] : credentials.email)

        if (useDb) {
          // If DB is configured, allow any email (create or find), optional password check can be added later
          const email = credentials.email.toLowerCase()
          let user = await prisma.user.findUnique({ where: { email } })
          if (!user) {
            user = await prisma.user.create({ data: { email, name: inputId } })
          }
          return { id: user.id, name: user.name ?? inputId, email: user.email ?? `${inputId}@rem.local` }
        }

        if (!allowedAgentIds.includes(inputId)) return null
        return { id: inputId, name: inputId, email: `${inputId}@rem.local` }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


