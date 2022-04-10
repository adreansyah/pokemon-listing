import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import { useState, FC, useEffect, useCallback } from 'react'
import { getContextStorage, useReceivedContext } from '../configs/ReferenceDataContext'
import dynamic from 'next/dynamic'
import styles from 'styles/Home.module.css'
import { useFetchData, useIsMounted } from 'hooks'
const ListingData = dynamic(() => import('component/main-component/listing-data'))
const ModalCard = dynamic(() => import('component/base-component/modal-card'))
const Div = dynamic(() => import('component/base-component/Segment'))
interface Props {
  pokemons: {
    results: Array<object>
  }
  first: number
}

const Home: FC<Props> = (props: Props) => {
  const [ownData, setownData] = useState<Array<any>>([])
  const [nick, setnick] = useState<string>("")
  const [createOwnData] = useState<Array<any>>([])
  const [open, setopen] = useState<boolean>(false)
  const [numbers, setNumbers] = useState<number>(20);
  const [errorFlex, setErrorFlex] = useState<any>({
    isError: false,
    id: "",
    label: false,
    helperText: "",
  })
  const hasMoreData = numbers < 1000;
  const { setContext } = useReceivedContext();
  const isMounted = useIsMounted()
  const { fetchPost, loading, data, called } = useFetchData({
    variables: {
      limit: numbers,
      offset: 1
    }
  })
  useEffect(() => {
    if (isMounted() && data.length === 0) {
      fetchPost({
        variables: {
          limit: numbers,
          offset: 1
        }
      })
    }
  }, [isMounted, data.length, numbers, fetchPost])
  const loadMoreNumbers = () => {
    if (isMounted() && data.length !== 0) {
      setNumbers((nums) => nums + data.length);
      fetchPost({
        variables: {
          limit: numbers,
          offset: 1
        }
      })
    }
  }
  const clickOwned = (list: object) => {
    setownData([list])
  }
  const handleChange = (event: any) => {
    const { value } = event.target
    setnick(value);
  }
  const submittedNickName = () => {
    const validate = createOwnData.map((item: any) => item.nick)
    if (validate.includes(nick) || nick.length === 0) {
      setErrorFlex({
        isError: true,
        id: "standard-error-helper-text",
        label: true,
        helperText: "Incorrect nickname or duplicate nickname",
      })
    }
    else {
      const storageContext = getContextStorage({ keyname: "POKE_OWNED" });
      createOwnData.push(...ownData.map(item => ({
        ...item,
        nick
      })))
      if (storageContext) {
        const storages = JSON.parse(storageContext)
        storages.push(...createOwnData)
        createOwnData.push(...storages)
      }
      setContext(createOwnData)
      setopen(!open)
    }
  }
  if (loading && !data.length) return <Div className='pre-loader'><CircularProgress color='warning' size={50} /></Div>
  return (
    <Div className={styles.container}>
      <ListingData
        data={data}
        hasMoreData={hasMoreData}
        loadMoreNumbers={loadMoreNumbers}
        loading={loading}
        setopen={setopen}
        open={open}
        clickOwned={clickOwned}
        loadOnMount={isMounted()}
      />
      <ModalCard
        open={open}
        setopen={setopen}
        Component={
          <Box sx={style}>
            <Typography marginY={1} id="transition-modal-title" fontSize={18} component="div">
              Give the pokemon nickname!
            </Typography>
            <TextField
              size='small'
              error={errorFlex.isError}
              onChange={(e) => handleChange(e)}
              fullWidth
              helperText={errorFlex.helperText}
              label={errorFlex.isError ? "Error" : "Nickname"}
            ></TextField>
            <Stack paddingY={1} spacing={2} direction="row">
              <Button onClick={submittedNickName} type='button' fullWidth variant="contained" color='warning'>Submit</Button>
              <Button onClick={() => {
                setopen(!open)
                setErrorFlex(() => ({
                  isError: false,
                  id: "",
                  label: false,
                  helperText: "",
                }))
              }} type='button' fullWidth variant="outlined">Cancel</Button>
            </Stack>
          </Box>
        }
      />
    </Div >
  )
}
export const style = {
  padding: 10,
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  bgcolor: 'white',
  border: '1px solid #f4f4f4',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default Home
