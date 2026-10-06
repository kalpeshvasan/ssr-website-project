import type {Metadata} from "next";
export const metadata:Metadata={title:"Accessibility",description:"Accessibility commitment."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Accessibility</h1><p className="muted">Accessibility commitment.</p></div><FeatureSection/><CTASection/></>}
