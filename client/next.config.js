/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["play-lh.googleusercontent.com", "is1-ssl.mzstatic.com"],
	},
	typescript: { ignoreBuildErrors: true },

	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
