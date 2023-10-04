import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useContext, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Box, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import { ServiceAddEquipment, ServiceGetMasterEquipmentById } from '../Service'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import RoomIcon from '@mui/icons-material/Room';
import { useForm } from 'react-hook-form'
import { Textarea } from '@mui/joy'
function DialogAddEquipment(props) {
    const { register, handleSubmit, reset } = useForm();
    const { open, close, master, mouse, layout, load, scale } = props;
    const [masterEquipments, setMasterEquipments] = useState([]);
    useEffect(() => {
        if (open) {
            reset();
            // ServiceGetMasterEquipment().then(res => (
            //     setMasterEquipments(res)
            // ))
            ServiceGetMasterEquipmentById(master.objId).then((res) => {
                console.log(res)
            })
        }
    }, [open])
    const onSubmit = (data) => {
        ServiceAddEquipment(data).then((res) => {
            load(layout.layoutCode)
        })
    }
    return <>
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'} >
            <DialogTitle >
                <Stack direction={'row'} gap={1}>
                    <FaPlus />
                    <Typography>เพิ่มจุดตรวจ</Typography>
                </Stack>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='hidden' value={layout.layoutCode} {...register('layoutCode')} />
                <DialogContent dividers>
                    <input
                        className='hidden' type='hidden'
                        value={master.objId}
                        {...register('ObjId')}
                    />
                    <input
                        className='hidden' type='hidden'
                        value={mouse.x}
                        {...register('EqpX', {
                            valueAsNumber: true
                        })}
                    />
                    <input
                        className='hidden' type='hidden'
                        value={mouse.y}
                        {...register('EqpY', {
                            valueAsNumber: true
                        })}
                    />

                    <input
                        className='hidden' type='hidden'
                        value={master.objW}
                        {...register('EqpW', {
                            valueAsNumber: true
                        })}
                    />
                    <input
                        className='hidden' type='hidden'
                        value={master.objH}
                        {...register('EqpH', {
                            valueAsNumber: true
                        })}
                    />

                    <input
                        className='hidden' type='hidden'
                        value={scale}
                        {...register('EqpScale', {
                            valueAsNumber: true
                        })}
                    />
                    <Stack gap={1}>
                        <Stack gap={1}>
                            <Typography><RoomIcon />&nbsp;ICON ที่เลือก</Typography>
                            <TextField
                                size='small'
                                id="outlined-number"
                                label="Object Name"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true
                                }}
                                disabled
                                value={master.objName}
                            />
                        </Stack>
                        <Stack gap={1}>
                            <Typography><AutoAwesomeMosaicIcon />&nbsp;รายละเอียดจุด</Typography>
                            <Stack gap={1}>
                                <TextField size='small' label='ชื่อ' inputProps={{ shrink: true }} focused {...register('EqpTitle', {
                                    required: true
                                })} />
                                <TextField size='small' label='รายละเอียด' inputProps={{ shrink: true }} focused fullWidth  {...register('EqpSubTitle')} />
                            </Stack>
                        </Stack>
                        <Stack>
                            <FormControl>
                                <FormControlLabel control={<Checkbox {...register('EqpTrigger')} />} label={'Event'} />
                            </FormControl>
                        </Stack>
                        <Stack gap={1}>
                            <Typography><ModeEditIcon />&nbsp;รอบการตรวจ (วัน, เดือน, ปี)</Typography>
                            <Box>
                                <Stack direction={'row'} gap={1}>
                                    <TextField size='small' label='วัน' type='number' defaultValue={master.objMstNextDay} inputProps={{ shrink: true }} focused {...register('ObjMstNextDay', {
                                        required: true,
                                        valueAsNumber: true
                                    })} />
                                    <TextField size='small' label='เดือน' type='number' defaultValue={master.objMstNextMonth} inputProps={{ shrink: true }} focused  {...register('ObjMstNextMonth', {
                                        required: true,
                                        valueAsNumber: true
                                    })} />
                                    <TextField size='small' label='ปี' type='number' defaultValue={master.objMstNextYear} inputProps={{ shrink: true }} focused  {...register('ObjMstNextYear', {
                                        required: true,
                                        valueAsNumber: true
                                    })} />
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack gap={1}>
                            <Typography>*&nbsp;หมายเหตุ</Typography>
                            <Textarea focused minRows={5} variant="outlined" title="หมายเหตุ ..." placeholder='หมายเหตุ ...' {...register('EQP_Remark')} />
                        </Stack>
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => close(false)}>
                        ปิดหน้าต่าง
                    </Button>
                    <Button variant='contained' type='submit' ><FaPlus />&nbsp;เพิ่ม</Button>
                </DialogActions>
            </form>
        </Dialog>
    </>
}
export default DialogAddEquipment;