import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { FaPlus } from 'react-icons/fa'
import { Stack, TextField, Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ServiceAddLayout } from '../Service'
function DialogAddLayout(props) {
    const { open, close, loadLayout } = props;
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        const res = await ServiceAddLayout(data);
        if (res.status) {
            loadLayout()
            close(false);
        } else {
            alert('ไม่สามารถเพิ่มพื้นที่ได้ !')
        }
    }
    return <>
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'xs'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>
                    <Stack direction={'row'} alignContent={'center'} gap={1}>
                        <FaPlus /><Typography>เพิ่มพื้นที่</Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent dividers>
                    <Stack gap={2}>
                        <TextField label="รหัสพื้นที่" size='small' fullWidth {...register('LayoutCode', { required: true })} focused placeholder='รหัสพื้นที่' />
                        <TextField label="ชื่อพื้นที่" size='small' fullWidth  {...register('LayoutName', { required: true })} focused placeholder='ชื่อพื้นที่' />
                        <Stack direction={'row'} gap={2}>
                            <TextField label="ความกว้าง" size='small' fullWidth {...register('LayoutWidth', { required: true })} focused placeholder='ความกว้าง' />
                            <TextField label="ความสูง" size='small' fullWidth  {...register('LayoutHeight', { required: true })} focused placeholder='ความสูง' />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={() => close(false)} color="default">
                    ปิดหน้าต่าง
                </Button>
                <Button onClick={() => close(false)} color="default">
                    บันทึก
                </Button> */}
                    <Button onClick={() => close(false)}>ปิดหน้าต่าง</Button>
                    <Button type='submit' variant='contained'><FaPlus />&nbsp;บันทึก</Button>
                </DialogActions>
            </form>
        </Dialog>
    </>
}
export default DialogAddLayout;