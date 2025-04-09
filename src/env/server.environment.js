// eslint-disable-next-line @typescript-eslint/no-var-requires
const { serverSchema } = require('./schema.environment');

const serverEnvironment = serverSchema.parse({
	BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
	API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	NEXTAUTH_SECRET: process.env.AUTH_SECRET,
	NEXTAUTH_URL: process.env.AUTH_URL,
});

module.exports = {
	serverEnv: serverEnvironment,
};
