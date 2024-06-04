/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // output: "export",
    images: {
        unoptimized: true,
        domains: [
            'localhost',
            'res.cloudinary.com',
            'images.unsplash.com',
            'cdn.pixabay.com',
            'cdn.dribbble.com',
            'cdn.fakercloud.com',
            'cdn.sanity.io',
            'loremflickr.com',
            'lh3.googleusercontent.com' ,
            'picsum.photos',
            'avatars.githubusercontent.com',
            'cloudflare-ipfs.com'
        ]
    },
    compiler: {
        styledComponents: true,
    }
}

module.exports = nextConfig
