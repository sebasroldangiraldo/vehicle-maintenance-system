import { ILoginRequest } from "@/app/core/application/dto/auth/logi-request.dto";
import { AuthService } from "@/app/infrastructure/services/auth.service";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthToken {
    id?: string;
    email?: string;
    token?: string;
};

interface AuthUser {
    id: string;
    email: string;
    token: string;
};

export interface CustomSession extends Session {
    user: {
        id?: string;
        token?: string;
        email?: string | null;
    };
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo Electrónico", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },
            authorize: async (credentials) => {

                if (!credentials?.password || !credentials?.email) {
                    console.error("Credenciales faltantes");
                    return null;
                };

                const loginRequest: ILoginRequest = {
                    email: credentials.email,
                    password: credentials.password
                };

                try {
                    const authService = new AuthService();
                    const response = await authService.login(loginRequest);

                    const userID = response.data.user.id.toString();

                    return {
                        id: userID,
                        email: response.data.user.email,
                        token: response.data.access_token
                    } as AuthUser;

                } catch (error) {
                    console.log(error);
                    return Promise.reject(new Error(JSON.stringify(error)));
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const authUser = user as AuthUser;
                token.id = authUser.id;
                token.email = authUser.email;
                token.token = authUser.token;
            }
            return token;
        },
        async session({ session, token }) {
            const customSession = session as CustomSession;
            customSession.user.id = (token as AuthToken).id;
            customSession.user.email = (token as AuthToken).email
            customSession.user.token = (token as AuthToken).token;
            return customSession;
        },
    },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);