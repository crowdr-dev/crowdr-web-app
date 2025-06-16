/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "crowdr.netlify.app",
    ],
  },

  async redirects() {
    return [
      // Redirect all /explore-campaigns/donate-or-volunteer/* to /explore/campaigns/*
      {
        source: "/explore-campaigns/donate-or-volunteer/:path*",
        destination: "/explore/campaign/:path*",
        permanent: true,
      },
      // Redirect all /explore-campaigns/* to /explore/*
      // {
      //   source: "/explore-campaigns/:path*",
      //   destination: "/explore/:path*",
      //   permanent: true,
      // },
      // Redirect all /campaigns/* to /dashboard/campaigns/*
      {
        source: "/campaigns/:path*",
        destination: "/dashboard/campaigns/:path*",
        permanent: true,
      },
      // Redirect all /donations/* to /dashboard/donations/*
      {
        source: "/donations/:path*",
        destination: "/dashboard/donations/:path*",
        permanent: true,
      },
      // Redirect all /settings/* to /dashboard/settings/*
      {
        source: "/settings/:path*",
        destination: "/dashboard/settings/:path*",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
