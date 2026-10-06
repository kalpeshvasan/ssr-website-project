import type {Metadata} from "next";
export const metadata:Metadata={title:"Partners",description:"Partner ecosystem."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Partners</h1><p className="muted">Partner ecosystem.</p></div><FeatureSection/><CTASection/></>}
