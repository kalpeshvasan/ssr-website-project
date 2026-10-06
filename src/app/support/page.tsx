import type {Metadata} from "next";
export const metadata:Metadata={title:"Support",description:"Support resources."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Support</h1><p className="muted">Support resources.</p></div><FeatureSection/><CTASection/></>}
