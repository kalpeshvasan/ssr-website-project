import type {Metadata} from "next";
export const metadata:Metadata={title:"Security",description:"Security practices."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Security</h1><p className="muted">Security practices.</p></div><FeatureSection/><CTASection/></>}
