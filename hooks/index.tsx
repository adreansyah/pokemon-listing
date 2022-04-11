import { useLazyQuery } from "@apollo/client"
import { GET_QUERY } from "configs/pokemon-gql"
import { useCallback, useEffect, useRef, useState } from "react"

export const useIsMounted = () => {
    const isMounted = useRef(false)
    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])
    return useCallback(() => isMounted.current, [])
}

export const useFetchData = ({ variables }: any) => {
    let [fetchPost, { called, loading, data }] = useLazyQuery(GET_QUERY, { variables, ssr: true });
    const [callBackData, setCallbackData] = useState([])
    useEffect(() => {
        if (data) {
            setCallbackData((prev: any) => {
                return Object.assign([], { ...prev, ...data.pokemons.results })
            })
        }
    }, [data])
    return {
        called,
        fetchPost,
        variables,
        loading,
        data: callBackData
    }
}

export const useCatchPokemon = ({ rate }: { rate: number }) => {
    const [status, setStatus] = useState<boolean>(false)
    const [isRate, setRate] = useState<number>(0)
    useEffect(() => {
        const value: boolean = isRate >= rate
        value && setStatus(true)
    }, [isRate])
    return {
        setRate,
        status,
        isRate
    }
}   