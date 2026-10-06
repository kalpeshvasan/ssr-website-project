import Link from "next/link"; import type {ReactNode} from "react";
export function Button({children,href,variant="primary",type="button"}:{children:ReactNode;href?:string;variant?:"primary"|"secondary"|"ghost";type?:"button"|"submit"}){const c=`btn btn-${variant}`;return href?<Link className={c} href={href}>{children}</Link>:<button className={c} type={type}>{children}</button>}
