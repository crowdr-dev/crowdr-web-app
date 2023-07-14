import React from 'react'
import "../home-styles/community.css";

type Props = {
  openModal : () => void
}

export default function Community({openModal} : Props) {
  return (
       <section className="community">
       <div className="community-content">
         <div className="community-text-hold">
           <div>
           <h1 className="">Be a part of our community.</h1>
           <button className="btn-standard btn-white" onClick={openModal}>Join Private Beta</button>
           </div>
         </div>
       </div>
       <div className="community-partb"/>
     </section>
  )
}
