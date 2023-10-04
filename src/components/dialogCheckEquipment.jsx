import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, InputBase, Paper, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { Textarea } from '@mui/joy'
import { ServiceCheckEquipment } from '../Service'
import TourIcon from '@mui/icons-material/Tour';
import moment from 'moment'
import { useEffect, useState } from 'react'
function DialogCheckEquipment(props) {
    const { open, close, eqp, load } = props;
    const { register, handleSubmit, setValue } = useForm();
    const [checked, setChecked] = useState(false);
    const onSubmit = (data) => {
        data.EqpId = eqp.eqpId;
        data.EqpStatus = checked
        console.log(data);
        ServiceCheckEquipment(data).then(res => {
            load();
        })
    }
    useEffect(() => {
        if (open) {
            setChecked(eqp?.status);
        }
    }, [open])
    return <>
        <Dialog open={open} close={() => close(false)} fullWidth maxWidth={'xs'}>
            <DialogTitle>
                ตรวจ
            </DialogTitle>
            {
                typeof eqp != 'undefined' && <form onSubmit={handleSubmit(onSubmit)}>
                    <input type='hidden'
                        value={eqp?.eqpId}
                        {...register('EqpId')}
                    />
                    <DialogContent dividers>
                        <Paper>
                            <Stack gap={1} p={2}>
                                <Box>
                                    <Typography>วันที่ตรวจ</Typography>
                                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                                        <CalendarMonthIcon />
                                    </IconButton>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search Google Maps"
                                        inputProps={{ 'aria-label': 'search google maps', readOnly: true }}
                                        value={moment().format('DD/MM/YYYY')}
                                    />
                                </Box>
                                <Box>
                                    <Typography>จุดตรวจ</Typography>
                                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                                        <TourIcon />
                                    </IconButton>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        inputProps={{ 'aria-label': 'search google maps', readOnly: true }}
                                        value={eqp?.name}
                                    />
                                </Box>
                                <Typography>ผลการตรวจ</Typography>
                                <Box className='pl-3 pt-2'>
                                    {/* defaultValue={(eqp?.status != '' && eqp?.status != 'null' && typeof eqp?.status != 'object') ? eqp?.status : 'false'}  */}

                                    <RadioGroup {...register('EqpStatus')} className='pl-3' defaultValue={eqp?.status} onChange={(e) => {
                                        setChecked(e.target.value == null ? 'false' : e.target.value)
                                    }}>
                                        <FormControlLabel value={'true'} control={<Radio />} label="ผ่าน" />
                                        <FormControlLabel value={'false'} control={<Radio />} label="ไม่ผ่าน" />
                                    </RadioGroup>
                                    {/* <input type={'radio'} value={'true'}  /> ผ่าน
                                <input type={'radio'} value={'false'} /> ไม่ผ่าน */}
                                </Box>
                                <Box>
                                    <Typography>หมายเหตุ</Typography>
                                    <Textarea minRows={3} placeholder='หมายเหตุ ...' {...register('EqpRemark')}>
                                    </Textarea>
                                </Box>
                            </Stack>
                        </Paper>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => close(false)}>ปิดหน้าต่าง</Button>
                        <Button variant='contained' type='submit'>บันทึก</Button>
                    </DialogActions>
                </form>
            }
        </Dialog>
    </>
}
export default DialogCheckEquipment;