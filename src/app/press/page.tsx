import type {Metadata} from "next";
export const metadata:Metadata={title:"Press",description:"Press resources."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Press</h1><p className="muted">Press resources.</p></div><FeatureSection/><CTASection/></>}
