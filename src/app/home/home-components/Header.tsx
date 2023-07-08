import { open } from 'fs/promises'
import React from 'react'

export default function Header({openModal} : { openModal : () => void}) {
  return (
       <section className="cta">
       <div className="content">
         <h2 className="content-header">
           Build community
           <br />
           through <span>giving.</span>
         </h2>
         <p className="">
           Crowdr helps you fundraise and find volunteering opportunities
           that make a change in our world.
         </p>

         <button className="btn-standard" onClick={openModal}>Join Private Beta</button>
       </div>
     </section>
  )
}