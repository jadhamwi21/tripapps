/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "play-lh.googleusercontent.com",
			},
			{
				hostname: "s1-ssl.mzstatic.com",
			},
		],
	},
	typescript: { ignoreBuildErrors: true },

	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
