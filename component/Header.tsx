import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Badge, Button, IconButton, Typography } from '@mui/material';
import { ArrowBack, CatchingPokemon } from '@mui/icons-material';
import { getContextStorage, useReceivedContext } from 'configs/ReferenceDataContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Div from './Segment';
interface PropsHeaders {
  counter?: number
}
const HeaderBar: React.FC<PropsHeaders> = () => {
  const logo: any = require('../assets/img/pokemon-3.png')
  const { pathname } = useRouter()
  const router = useRouter()
  const [isCount, setCount] = React.useState<any>(null)
  const { context } = useReceivedContext()
  React.useEffect(() => {
    const Counting = getContextStorage({ keyname: "POKE_COUNT" })
    setCount(Counting)
  }, [context])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" enableColorOnDark color='transparent' style={{ backgroundColor: "#ffa429", color: "white" }}>
        <Toolbar>
          {
            pathname === "/" ? <Link href={"/"} passHref={true}>
              <Div className='image-fit-ration'>
                <Image
                  width="200"
                  height="100"
                  src={logo.default.src} alt="Pokemon Logo" />
              </Div>
            </Link> :
              <Box sx={{ display: { md: 'flex' } }}>
                <Button
                  onClick={() => router.back()}
                  size='large' startIcon={<ArrowBack sx={{ color: "white" }} fontSize='large' />} />
              </Box>
          }
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: 'flex' } }}>
            <Link href={'/my-pokemon-list/load'} passHref={false}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={isCount ? isCount : null} color="error">
                  <CatchingPokemon />
                  <Typography className='pokedex-title' component='p'>Pokedex</Typography>
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box >
  )
}
export default HeaderBar;