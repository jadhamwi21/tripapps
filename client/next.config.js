/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["play-lh.googleusercontent.com", "apps.apple.com/assets/artwork"],
	},
	typescript: { ignoreBuildErrors: true },

	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
