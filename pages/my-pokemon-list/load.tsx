
import React, { useEffect, useState } from "react";
import { CatchingPokemonOutlined } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { getContextStorage, useReceivedContext } from "configs/ReferenceDataContext";
import styles from 'styles/Home.module.css'
import dynamic from "next/dynamic";
import Link from "next/link";
const Div = dynamic(() => import('component/base-component/Segment'))
const CardList = dynamic(() => import('component/base-component/card-list'))
type PROPSTYPESCARD = {
    classification?: string
    id?: string
    image?: string
    nick?: string
    name?: string
    types?: Array<string>
}
export async function getServerSideProps() {
    return {
        props: {
            value: true
        }
    }
}
const MyPokemonList = () => {
    const { context, deleteContext } = useReceivedContext();
    const [data, setData] = useState<Array<object>>([])
    useEffect(() => {
        const storage = getContextStorage({ keyname: "POKE_OWNED" });
        if (storage) {
            const fetchData = JSON.parse(storage)
            setData(fetchData)
        }
        else {
            setData([])
        }
    }, [context.length])
    const removeContext = (state: any) => {
        const x = data.filter((item: any) => item.nick !== state.nick)
        deleteContext(x)
    }
    return (
        <Div className={styles.container}>
            {data.length !== 0 && <Typography textAlign={"center"} fontWeight="bold" fontSize={"1.8em"} variant="h4" component="div">
                Pokemon Collection
            </Typography>}
            <Div>
                {data.length === 0 ? <Div className="centerLineMessage">
                    <Div>
                        <Typography color={"#767575"} component="p">Data Not Found</Typography>
                        <Link href="/" passHref={true}>
                            <Button size="small" startIcon={<CatchingPokemonOutlined fontSize="large" />} variant="outlined" color="error">
                                <Typography fontWeight="bold" fontSize={"1.8em"} variant="h6" component="div">Choose the pokemon</Typography>
                            </Button>
                        </Link>
                    </Div>
                </Div> : <Grid item paddingTop={5} container sx={{ minWidth: 100 }} spacing={2}>
                    {
                        data.map((item: PROPSTYPESCARD, id: number) =>
                            <Grid key={id} item xs={6} sm={6} md={4}>
                                <CardList
                                    id={item.id}
                                    isLink={`/my-pokemon-detail/${item.name}`}
                                    nick={item.nick}
                                    name={item.name}
                                    image={item.image}
                                    classification={item.classification}
                                    types={item.types}
                                    removeContext={removeContext}
                                />
                            </Grid>)
                    }
                </Grid>}
            </Div>
        </Div>)
}
export default MyPokemonList