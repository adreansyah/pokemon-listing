import { createContext, ReactNode, useCallback, useContext, useState } from "react";
type ContextType = {
    context: any;
    setContext: any;
    deleteContext: any
};
const ContextDefaultValues: ContextType = {
    context: [],
    setContext: () => { },
    deleteContext: () => { },
};
const CreateContext = createContext<ContextType>(ContextDefaultValues);

export function useReceivedContext() {
    return useContext(CreateContext);
}

type Props = {
    children: ReactNode;
};

export const setContextStorage = (params: {
    keyname: string,
    keyvalue: string,
    minutes: number | null
}) => {
    localStorage.setItem(params.keyname, params.keyvalue);
}
export const getContextStorage = (params: { keyname: string }) => {
    const valueStr: string | null = localStorage.getItem(params.keyname);
    return valueStr
}

export function ContextProvider({ children }: Props) {
    const [context, setcontext] = useState<[]>([]);
    const setContext = useCallback((output: []) => {
        setcontext(prev => {
            return [
                ...prev,
                ...output
            ]
        })
    }, [setcontext])
    const deleteContext = (output: []) => {
        if (!output.length) {
            localStorage.removeItem("POKE_OWNED");
            localStorage.removeItem("POKE_COUNT");
        }
        else {
            setContextStorage({ keyname: "POKE_OWNED", keyvalue: JSON.stringify(output), minutes: 30000 })
            setContextStorage({ keyname: "POKE_COUNT", keyvalue: output.length === 0 ? "" : output.length, minutes: 30000 })
        }
        setcontext(output)
    }
    const filteredArr = context.reduce((acc: any, current: any) => {
        const x = acc.find((item: any) => item.nick === current.nick);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
    filteredArr.length !== 0 && setContextStorage({ keyname: "POKE_OWNED", keyvalue: JSON.stringify(filteredArr), minutes: 30000 })
    filteredArr.length !== 0 && setContextStorage({ keyname: "POKE_COUNT", keyvalue: filteredArr.length, minutes: 30000 })
    const value: any = {
        context: filteredArr,
        setContext,
        deleteContext
    };
    return (
        <>
            <CreateContext.Provider value={value}>
                {children}
            </CreateContext.Provider>
        </>
    );
}