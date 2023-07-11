import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { ZodError, z } from 'zod'

const env = dotenv.config();
dotenvExpand.expand(env)

const processEnvValidate = (env:any) => {
    try {
        const schema = z.object({
            SECRET_KEY: z.string().min(3).max(30),
            PORT: z.string(),
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