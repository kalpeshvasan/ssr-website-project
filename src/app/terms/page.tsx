import type {Metadata} from "next";
export const metadata:Metadata={title:"Terms",description:"Terms of service."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Terms</h1><p className="muted">Terms of service.</p></div><FeatureSection/><CTASection/></>}
