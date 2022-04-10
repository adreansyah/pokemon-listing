import { FC, forwardRef } from "react";
interface PropsDiv {
    children?: JSX.Element | JSX.Element[] | string | null | undefined | any,
    className?: string
}
const Div: FC<PropsDiv> = forwardRef(({ children, className }: PropsDiv, ref: any) => {
    return (<div ref={ref} className={className}>{children}</div>)
})
export default Div