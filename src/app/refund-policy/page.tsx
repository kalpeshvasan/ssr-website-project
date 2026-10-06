import type {Metadata} from "next";
export const metadata:Metadata={title:"Refund Policy",description:"Refund policy."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Refund Policy</h1><p className="muted">Refund policy.</p></div><FeatureSection/><CTASection/></>}
