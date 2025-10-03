import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '@/models/User'
import connectDB from '@/db/connectDB'


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })

  ],
    secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connectDB()


        const currentUser = await User.findOne({ email: user.email })
        if (!currentUser) {
          const usernameFromEmail = user.email.split("@")[0]; // example: "suhail123"

          const NewUser = await User.create({
            name: profile.name, // "Suhail Khan"
            username: usernameFromEmail, // generate custom username
            email: user.email,
            profilePicture: profile.picture, // google profile pic
            // coverPicture: "https://default-cover.jpg", // default placeholder
          });
        }
        return true;
      } catch (error) {
    
       return false;
      }
    }
  }
})


export { handler as GET, handler as POST }


