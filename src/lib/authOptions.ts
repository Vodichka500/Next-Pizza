import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "../../prisma/prisma-client";
import {compare, hashSync} from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const values = {
                    email: credentials.email,
                };

                const findUser = await prisma.user.findFirst({
                    where: values,
                });

                if (!findUser) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, findUser.password);

                if (!isPasswordValid) {
                    return null;
                }

                // if (!findUser.verified) {
                //     return null;
                // }

                return {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.fullName,
                    role: findUser.role,
                };
            }
        }),
    ],
    session: {strategy: 'jwt'},
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async jwt({ token }) {
            if (!token.email) {
                return token;
            }

            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            });

            if (findUser) {
                token.id = String(findUser.id);
                token.email = findUser.email;
                token.fullName = findUser.fullName;
                token.role = findUser.role;
            }

            return token;
        },
        session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }

            return session;
        },
        async signIn({ user, account }) {
            try {
                if (account?.provider === 'credentials') {
                    return true;
                }
                console.log(user)

                if (!user.email) {
                    return false;
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            // { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user.email },
                        ],
                    },
                });

                console.log(findUser)

                if (findUser) {
                    await prisma.user.update({
                        where: {
                            id: findUser.id,
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    });

                    return true;
                }

                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullname: user.name || 'User #' + user.id,
                        password: hashSync(user.id.toString(), 10),
                        verified: new Date(),
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                    },
                });

                return true;
            } catch (error) {
                console.error('Error [SIGNIN]', error);
                return false;
            }
        },
    }
}