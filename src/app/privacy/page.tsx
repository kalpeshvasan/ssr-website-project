import type {Metadata} from "next";
export const metadata:Metadata={title:"Privacy",description:"Privacy policy."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Privacy</h1><p className="muted">Privacy policy.</p></div><FeatureSection/><CTASection/></>}
