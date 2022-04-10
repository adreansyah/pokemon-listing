import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import { Grid } from '@mui/material'
const InfiniteScroll = dynamic(() => import('component/base-component/infinite-scroll'))
const CardList = dynamic(() => import('component/base-component/card-list'))

interface Props {
    loadMoreNumbers: () => void
    loading: boolean
    hasMoreData: boolean
    clickOwned: any
    setopen: any
    open: boolean
    data: []
}

const ListingData: FC<Props> = ({ hasMoreData, loading, loadMoreNumbers, clickOwned, setopen, open, data }: Props) => {
    return (
        <InfiniteScroll
            hasMoreData={hasMoreData}
            isLoading={loading}
            onBottomHit={loadMoreNumbers}
            loadOnMount={true}
        >
            <Grid
                container
                direction="row"
                spacing={2}>
                {
                    data.map((item: any, id: number) => <Grid key={id} item xs={6} sm={6} md={4}>
                        <CardList
                            isLoading={loading}
                            id={item.id}
                            isLink={`/my-pokemon-detail/${item.name}`}
                            name={item.name}
                            image={item.image}
                            classification={item.classification}
                            types={item.types}
                            clickOwned={clickOwned}
                            setopen={() => setopen(!open)}
                        />
                    </Grid>)
                }
            </Grid>
        </InfiniteScroll>
    )
}
export default ListingData
