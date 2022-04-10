import { Backdrop, Fade, Modal } from '@mui/material'
import { FC } from 'react'
import Div from 'component/Segment'

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