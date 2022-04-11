import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardMedia, CircularProgress } from '@mui/material';
import { CatchingPokemonOutlined, CatchingPokemonTwoTone } from '@mui/icons-material';
import Div from './Segment';
import { useRouter } from 'next/router';

interface PROPSTYPESCARD {
    disabled?: boolean
    isLoading?: boolean
    classification?: string
    isLink?: string
    nick?: string
    id?: string
    image?: string
    name?: string
    types?: Array<string>,
    clickOwned?: any,
    setopen?: any,
    removeContext?: any
}
const CardList: React.FC<PROPSTYPESCARD> = (props: PROPSTYPESCARD) => {
    const { pathname } = useRouter()
    const router = useRouter();
    return (
        <Div>
            <Card sx={{ paddingY: 0 }} >
                {
                    props.isLoading ?
                        <Typography
                            textAlign="center"
                            className='card-effects'
                            sx={{
                                // cursor: "pointer",
                                padding: "10px",
                                margin: "10px auto",
                                width: "80%",
                                borderRadius: "100%"
                            }}
                            component="div"
                        ><CircularProgress color='warning' /> </Typography>
                        :
                        <CardMedia
                            className='card-effects'
                            onClick={() => router.push({
                                pathname: `${props.isLink}`,
                                query: { image: props.image, id: props.id },
                            })}
                            sx={{
                                cursor: "pointer",
                                padding: "10px",
                                margin: "10px auto",
                                border: `3px solid #ffa42a`,
                                width: "80%",
                                borderRadius: "100%"
                            }}
                            component="img"
                            height={"auto"}
                            image={props.image}
                            alt="Stretor-correction"
                        />
                }
                <CardContent sx={{ padding: 0 }}>
                    <Typography sx={{ padding: 0 }} color="#808080e3" fontWeight="bold" textAlign={"center"} fontSize={14} margin={0} component="p">
                        {props.name?.charAt(0).toUpperCase()}{props.name?.slice(1)}
                    </Typography>
                    {
                        props.nick && (
                            <>
                                <Typography fontSize={12} color="#808080e3" fontWeight="bold" textAlign={"center"} component="p">
                                    As
                                </Typography>
                                <Typography fontSize={14} color="#808080e3" fontWeight="bold" textAlign={"center"} variant="h6" component="div">
                                    {props.nick?.charAt(0).toUpperCase()}{props.nick?.slice(1)}
                                </Typography>
                            </>
                        )
                    }
                </CardContent>
                {pathname !== "/my-pokemon-list/load" && <CardActions
                    style={{
                        borderTop: "1px solid #eeeeee"
                    }}
                    disableSpacing>
                    <Button
                        disabled={props.disabled}
                        onClick={() => {
                            props.setopen()
                            props.clickOwned({
                                id: props.id,
                                image: props.image,
                                name: props.name,
                            })
                        }}
                        startIcon={
                            props.disabled ? <CircularProgress color='warning' size={14}/> : <CatchingPokemonTwoTone style={{ color: "red" }} />
                        }
                        variant="text"
                        size='medium'
                    >
                        <Typography component="p" sx={{ fontSize: "0.6rem", fontWeight: "bold", margin: 0 }} color="text.secondary" gutterBottom>
                            {props.disabled ? "Waiting Catch..." : "Pick the pokemon"}
                        </Typography>
                    </Button>
                </CardActions>}
                {pathname === "/my-pokemon-list/load" && <CardActions disableSpacing>
                    <Button
                        onClick={() => props.removeContext(props)}
                        startIcon={<CatchingPokemonOutlined />}
                        size="small"
                        sx={{ fontSize: "10px" }}
                        color='error'
                        variant='outlined'
                        fullWidth > Destroy</Button>
                </CardActions>}
            </Card>
        </Div>
    );
}
export default CardList