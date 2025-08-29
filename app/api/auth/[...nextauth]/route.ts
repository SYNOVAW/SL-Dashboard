import NextAuth, { type NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { allowedAgentIds, normalizeAgentId } from "@/lib/agents"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email) return null
        const inputId = normalizeAgentId(
          credentials.email.includes("@") ? credentials.email.split("@")[0] : credentials.email
        )
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


