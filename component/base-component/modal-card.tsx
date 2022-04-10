import { Backdrop, Fade, Modal } from '@mui/material'
import dynamic from 'next/dynamic'
import { FC } from 'react'
const Div = dynamic(() => import('component/base-component/Segment'))

interface PropsModal {
    open: boolean,
    setopen: any
    Component: JSX.Element
}
const ModalCard: FC<PropsModal> = (props: PropsModal) => {
    return (
        <Div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open}
                onClose={() => props.setopen(!open)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    {props.Component}
                </Fade>
            </Modal>
        </Div>
    )
}

export default ModalCard