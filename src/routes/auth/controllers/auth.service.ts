import { OAuth2Client } from 'google-auth-library';
import { signUpType } from './auth.schema'
import { nanoid } from 'nanoid';
interface iUser {
    user_id: string
    email: string
    subscription: boolean
    expires: string
}
let db = [] as iUser[]
const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    process.env.GOOGLE_OAUTH_REDIRECT_URL!
);

export const registrate = async (email: string) => {
    try {
        let user = db.find(el => el.email === email)
        if (user) return user

        let new_user: iUser = {
            user_id: nanoid(),
            email,
            subscription: false,
            expires: ''
        }
        db.push(new_user)
        return new_user

    } catch (error) {
        throw error
    }
}

export const signIn = async (dto: signUpType) => {
    try {
        // await admin.auth().generateSignInWithEmailLink()
    } catch (error) {
        throw error
    }
}
export const requestGoogleAccess = async () => {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    });
    return authorizeUrl
}

export const verifyGoogleAccess = async (code: string) => {
    try {
        const tokensInfo = await oAuth2Client.getToken(code)
        oAuth2Client.setCredentials({
            refresh_token: tokensInfo.tokens.refresh_token
        });
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: tokensInfo.tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload()!
        const email = payload.email
        return email
    } catch (error) {
        throw error
    }
}


