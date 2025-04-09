// eslint-disable-next-line @typescript-eslint/no-var-requires
const zod = require('zod');

const serverSchema = zod.object({
	API_BASE_URL: zod.string(),
	NEXTAUTH_SECRET: zod.string(),
	NEXTAUTH_URL: zod.string(),
});

const clientSchema = zod.object({
	API_BASE_URL: zod.string(),
});

module.exports = {
	serverSchema,
	clientSchema,
};
