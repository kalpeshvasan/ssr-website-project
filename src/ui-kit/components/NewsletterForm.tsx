"use client"; import {useState} from "react";
export function NewsletterForm(){const[d,setD]=useState(false);return <form onSubmit={e=>{e.preventDefault();setD(true)}} className="row"><input className="input" type="email" required placeholder="you@example.com"/><button className="btn btn-primary">Subscribe</button>{d&&<span>Thanks!</span>}</form>}
