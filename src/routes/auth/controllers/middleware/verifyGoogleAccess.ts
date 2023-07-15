import { OAuth2Client } from 'google-auth-library';
import { NextFunction, Request, Response } from "express";

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_OAUTH_REDIRECT_URL!
);
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
export const verifyGoogleAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const tokensInfo = await oAuth2Client.getToken(req.query.code as string)
        oAuth2Client.setCredentials({
            refresh_token: tokensInfo.tokens.refresh_token
        });
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: tokensInfo.tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload()!
        const email = payload.email!
        req.query.email = email
        return next()

    } catch (error) {
        next(error)
    }
}