import type {Metadata} from "next";
export const metadata:Metadata={title:"Status",description:"Service status."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Status</h1><p className="muted">Service status.</p></div><FeatureSection/><CTASection/></>}
