import type {Metadata} from "next";
export const metadata:Metadata={title:"Sign Up",description:"Account creation."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Sign Up</h1><p className="muted">Account creation.</p></div><FeatureSection/><CTASection/></>}
