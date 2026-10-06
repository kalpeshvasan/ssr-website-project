import type {Metadata} from "next";
export const metadata:Metadata={title:"Reports",description:"Reporting page."};
import {FeatureSection,CTASection} from "@/ui-kit/templates";
export default function Page(){return <><div className="container page-title"><span className="badge">PAGE</span><h1>Reports</h1><p className="muted">Reporting page.</p></div><FeatureSection/><CTASection/></>}
