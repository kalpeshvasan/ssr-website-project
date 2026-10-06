import type {Metadata} from "next";
export const metadata:Metadata={title:"Cancellation Policy",description:"Cancellation policy."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Cancellation Policy</h1><p className="muted">Cancellation policy.</p></div><FeatureSection/><CTASection/></>}
