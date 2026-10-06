import type {Metadata} from "next";
export const metadata:Metadata={title:"Solutions",description:"Solution landing page."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Solutions</h1><p className="muted">Solution landing page.</p></div><FeatureSection/><CTASection/></>}
