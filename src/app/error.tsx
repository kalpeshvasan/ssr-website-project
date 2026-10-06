"use client";
export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){return <div className="container section center"><h1>Something went wrong</h1><button className="btn btn-primary" onClick={()=>reset()}>Try again</button></div>}
