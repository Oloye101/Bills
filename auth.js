import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import     Twitter       from "next-auth/providers/twitter"
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET
       }),
       Twitter({
        clientId: process.env.AUTH_TWITTER_ID,
        clientSecret: process.env.AUTH_TWITTER_SECRET
       })

  ],
  adapter:FirestoreAdapter({
    credential:cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY ? process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") : undefined
    })
  }),
  pages: {
    signIn: "/auth/signin"
  },
  callbacks: {
    session:async ({session}) => {
     return session
    }
  }
});

