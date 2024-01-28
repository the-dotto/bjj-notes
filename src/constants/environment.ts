import { z } from 'zod';

type Environment = z.infer<typeof SCHEMA>;

const SCHEMA = z.object({
	isProduction: z.boolean().default(false),

	supabase: z.object({
		projectId: z.string(),
		url: z.string(),
		key: z.string()
	})
});

export const ENV: Environment = SCHEMA.parse({
	isProduction: process.env.NODE_ENV === 'production',

	supabase: {
		projectId: process.env.SUPABASE_PROJECT_ID,
		url: process.env.SUPABASE_URL,
		key: process.env.SUPABASE_KEY,
	},
});