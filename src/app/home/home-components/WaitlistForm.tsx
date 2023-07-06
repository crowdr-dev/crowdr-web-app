"use client";
import React from 'react'
import Image from "next/image";

export default function waitlistForm() {
  return (
       <section className="modal-backdrop hide-modal">
       <div className="modal-hold">
         <div className="join-waitlist-img-hold">
           <Image
             src="/assets/svg/join-waitlist.svg"
             alt="waitlist"
             width={200}
             height={200}
             className=""
           />
         </div>
         <form
           className="modal"
           name="simple-contact-form"
           action="https://formspree.io/f/mwkjzgvb"
           method="POST"
         >
           <h2 className="">Join the waitlist!</h2>
           <p className="">Be the first to know when we launch.</p>

           <div className="input-hold">
             <label htmlFor="fullname" className="">
               Full name
             </label>
             <input
               type="text"
               name="name"
               id="fullname"
               className=""
               placeholder="Enter your full name"
               required
             />
           </div>

           <div className="input-hold">
             <label htmlFor="email" className="">
               Email address
             </label>
             <input
               type="email"
               name="email"
               id="email"
               className=""
               placeholder="Enter your email address"
               required
             />
           </div>

           <div className="input-hold">
             <label htmlFor="title" className="">
               Who are you?
             </label>
             <select name="message" id="title" className="" required>
               <option value="">Select title</option>
               <option value="Volunteer">Volunteer</option>
               <option value="Non-profit organization">
                 Non-profit organization
               </option>
               <option value="Not sure yet">Not sure yet</option>
             </select>
           </div>

           <button type="submit" className="">
             Submit
           </button>
         </form>
       </div>
     </section>
  )
}
