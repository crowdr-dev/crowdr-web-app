import React, { Fragment, PropsWithChildren } from 'react'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Explore campaigns'
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}
