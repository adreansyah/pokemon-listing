import React, { FC, useEffect, useRef, useState } from "react";

interface Props {
    onBottomHit: () => void
    isLoading: boolean
    hasMoreData: boolean
    loadOnMount: boolean
}

function isBottom(ref: React.RefObject<HTMLDivElement>) {
    if (!ref.current) {
        return false;
    }
    return Math.round(ref.current.getBoundingClientRect().bottom) <= window.innerHeight;
}

const InfiniteScroll: FC<Props> = ({
    onBottomHit,
    isLoading,
    hasMoreData,
    loadOnMount,
    children
}) => {
    const [initialLoad, setInitialLoad] = useState<boolean>(true)
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (loadOnMount && initialLoad) {
            onBottomHit();
            setInitialLoad(false);
        }
    }, [onBottomHit, loadOnMount, initialLoad]);

    useEffect(() => {
        const onScroll = () => {
            if (!isLoading && hasMoreData && isBottom(contentRef)) {
                onBottomHit();
            }
        };
        document.addEventListener('scroll', onScroll);
        return () => document.removeEventListener('scroll', onScroll);
    }, [onBottomHit, isLoading, hasMoreData]);
    return <div ref={contentRef}>{children}</div>;
}

export default InfiniteScroll;