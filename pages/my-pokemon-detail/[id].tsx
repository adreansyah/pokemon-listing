import React, { FC } from "react";
import { Badge, Button, Card, CardContent, CardMedia, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import { GET_DETAIL } from "configs/pokemon-gql";
import client from "configs/pokemon-gql/apollo-client";
import dynamic from "next/dynamic";
const Div = dynamic(() => import('component/base-component/Segment'))

export async function getServerSideProps(req: any, query: any) {
    const { data } = await client.clientOtherRender.query({
        variables: { name: req.params.id },
        query: GET_DETAIL,
    });
    return {
        props: {
            image: req.query.image,
            pokemon: data.pokemon
        }
    }
}
interface PROPS {
    pokemon: Array<object>
    image: string
}
const MyPokemonDetail: FC<PROPS> = (props: PROPS) => {
    const { abilities, height, weight, species, stats, types, moves }: any = props.pokemon
    const getAbilities = [new Set(abilities.map((item: any) => item.ability.name))]
    return (
        <Card>
            <CardMedia
                color="red"
                sx={{
                    cursor: "pointer",
                    padding: "10px",
                    margin: "10px auto",
                    border: `3px solid #ffa42a`,
                    width: "auto",
                    borderRadius: "100%"
                }}
                component="img"
                height={"150"}
                alt="Stretor-correction"
                image={props.image}
            />
            <Typography paddingBottom={2} textAlign={"center"} fontWeight={"bold"} color="gray" component="div">
                {species.name?.charAt(0).toUpperCase()}{species.name?.slice(1)}
            </Typography>
            <Divider />
            <CardContent>
                <Typography display={"flex"} justifyContent={"unset"} fontWeight={"bold"} color="gray" component="div">
                    <div>
                        Types :
                    </div>
                    <div>
                        {
                            types.map((item: any, idx: number) => <span key={idx} style={{
                                display: "grid",
                                paddingLeft: 8,
                                color: "#0889d1",
                                fontWeight:400,
                                fontSize:12
                            }}>- {item.type.name.toUpperCase()} </span>)
                        }
                    </div>
                </Typography>
            </CardContent>
            <Divider />
            <CardContent>
                <Typography fontWeight={"bold"} color="gray" component="div">
                    Abilities : {
                        getAbilities.map((item: any, idx: number) => (
                            <Button key={idx} sx={{ marginX: "5px", fontSize: "12px" }} color="info" variant="text" size="small">
                                {item}
                            </Button>
                        ))
                    }
                    <span style={{ position: "absolute", fontSize: "10px", fontWeight: 400 }}>(Click for details!)</span>
                </Typography>
            </CardContent>
            <Divider />
            <CardContent>
                <Typography fontWeight={"bold"} color="gray" component="div">
                    Height : {height} Meters
                </Typography>
                <Typography fontWeight={"bold"} color="gray" component="div">
                    Weight : {weight} Lbs
                </Typography>
            </CardContent>
            <Divider />
            <CardContent>
                <Typography fontWeight={"bold"} color="gray" component="div">Base Status :</Typography>
                {
                    stats.map((item: any, idx: number) => (
                        <Div key={idx}>
                            <Typography fontWeight="bold" color="gray" fontSize={"0.8rem"} lineHeight={0} textAlign={"right"} component="div">{item.base_stat}%</Typography>
                            <Div className="meter">
                                <Typography sx={{
                                    width: `${item.base_stat}%`
                                }} component="span">
                                    <Typography style={{ backgroundColor: "#ffa42a" }} className="progress" component="span"></Typography>
                                </Typography>
                            </Div>
                        </Div>
                    ))
                }
            </CardContent>
            <CardContent>
                <Typography fontWeight={"bold"} color="gray" component="div">Moves :</Typography>
                <Grid
                    container
                    direction="row"
                    spacing={2}>
                    {
                        moves.map((item: any, idx: number) => (
                            <Grid item xs={4} sm={1} md={1} key={idx}>
                                <Div className="pokemon-badge-moves">{item.move.name}</Div>
                            </Grid>
                        ))
                    }

                </Grid>
            </CardContent>
        </Card>
    )
}

export default MyPokemonDetail