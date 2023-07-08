import React from 'react'

export default function Community({openModal} : any) {
  return (
       <section className="watchlist">
       <div className="watchlist-content">
         <div className="watchlist-text-hold">
           <div>
           <h1 className="">Be a part of our community.</h1>
           <button className="btn-standard btn-white" onClick={openModal}>Join Private Beta</button>
           </div>
         </div>
       </div>
       <div className="watchlist-partb"/>
     </section>
  )
}
