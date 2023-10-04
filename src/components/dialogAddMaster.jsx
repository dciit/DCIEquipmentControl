import { useState, useEffect, FC } from "react";
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Box, Divider, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import { useForm } from "react-hook-form";
import { Textarea } from "@mui/joy";
import { ServiceAddMaster } from "../Service";
function DialogAddMaster(props) {
    const { register, handleSubmit, setFocus, formState: { errors } } = useForm();
    const { open, close } = props;
    const [master, setMaster] = useState();
    const [verifyNextDate, setVerifyNextDate] = useState(true);
    const onSubmit = (data) => {
        console.log(data)
        if (data.objMstNextDay == 0 && data.objMstNextMonth == 0 && data.objMstNextYear == 0) {
            setVerifyNextDate(true);
            return false;
        }
        setVerifyNextDate(false);
        ServiceAddMaster(data).then((res) => {
            console.log(res);
        })
    }
    // const handleChange = (e) => {
    //     setMaster({
    //         ...master,
    //         [e.target.name]: e.target.value.trim()
    //     })
    // }

    const InputField = ({ title, type = 'text', name, value, def }) => {
        return <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1}>
            <Typography color="initial">{title}</Typography>
            <TextField
                type={type}
                size="small"
                value={value}
                defaultValue={def}
                {...register(name, {
                    required: true
                })}
            />
        </Stack>
    }

    useEffect(() => {
    }, [open])
    return <>
        <Dialog open={open} onClose={() => close(false)} >
            <DialogTitle>
                Add Equipment Master
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers>
                    <Stack gap={2}>
                        <Box gap={2}>
                            <Stack gap={1}>
                                <InputField title="รหัส : " name="objId" type={"text"} def={''} />
                                <InputField title="ชื่อ : " name="objName" type={"text"} def={''} />
                                <InputField title="กว้าง : " type="number" name="objW" def={0} />
                                <InputField title="สูง : " type="number" name="objH" def={0} />
                            </Stack>
                        </Box>
                        <Divider />
                        <Typography>วันที่ตรวจเช็ครอบถัดไป</Typography>
                        <Stack gap={1} direction={'row'}>
                            <InputField title="Day" name="objMstNextDay" def={0} />
                            <InputField title="Month" name="objMstNextMonth" def={0} />
                            <InputField title="Year" name="objMstNextYear" def={0} />
                            {/* {errors.objMstNextDay && <p>{errors.objMstNextDay.message}</p>} */}
                        </Stack>
                        {verifyNextDate && <Typography className="text-red-600 text-[12px]">กรุณาระบุรอบตรวจถัดไป</Typography>}
                        <Stack gap={1}>
                            <Typography color="initial">SVG Code : </Typography>
                            <Textarea minRows={5} variant="outlined" title="SVG Code" {...register('objSvg', { required: true })} name="objSvg" def={''} />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => close(false)}>Close</Button>
                    <Button variant="contained" type='submit'>Confirm</Button>
                </DialogActions>
            </form >
        </Dialog >
    </>
}
export default DialogAddMaster;