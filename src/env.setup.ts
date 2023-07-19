import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { ZodError, z } from 'zod'

const env = dotenv.config();
dotenvExpand.expand(env)

const processEnvValidate = (env: any) => {
    try {
        const schema = z.object({
            SECRET_KEY: z.string().min(3).max(30),
            PORT: z.string(),
            GOOGLE_CLIENT_ID: z.string(),
            GOOGLE_CLIENT_SECRET: z.string(),
            GOOGLE_OAUTH_REDIRECT_URL: z.string().url(),
            GOOGLE_OAUTH_URL: z.string().url(),
        });

        const result = schema.parse(env);
    } catch (error) {
        if (error instanceof ZodError) {
            throw new SyntaxError(`.env -> ${error.message}`);
        }
        throw error
    }
};
processEnvValidate(env.parsed)