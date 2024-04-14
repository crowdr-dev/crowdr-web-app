import React, { Fragment, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { ResolvingMetadata } from 'next'
import { getSingleCampaign } from '@/app/api/campaigns/getCampaigns'

export async function generateMetadata (
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const campaign: any = await getSingleCampaign(id)

  return {
    title: {
      absolute:
        (campaign?.campaignType.includes('fundraise')
          ? 'Donate to '
          : 'Volunteer to ') +
        campaign.title +
        ` organised by ${campaign?.user?.organizationName}`
    },
    description: `Explore campaigns and spread love by donating or volunteering to ${campaign.title}`,
    twitter: {
      card: "summary_large_image",
      site: "https://www.oncrowdr.com/", 
      creator: "@oncrowdr",
      images: campaign?.campaignCoverImage?.url,
      description: `Explore campaigns and spread love by donating or volunteering to ${campaign.title}`,
    },
  }
}

export default function Layout (props: any) {
  return <Fragment>{props.children}</Fragment>
}
