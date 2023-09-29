/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	images: { domains: ["play-lh.googleusercontent.com"], unoptimized: true },
	typescript: { ignoreBuildErrors: true },

	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
