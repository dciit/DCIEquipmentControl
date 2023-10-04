import { Box, Button, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from 'react-icons/fa';
import { ServiceGetEquipment, ServiceAddEquipment, servGetEquipment, ServiceGetMasterEquipment, ServiceDeleteMasterEquipment, ServiceDelEquipment, ServiceGetLayouts } from "../Service";
import DialogAddMaster from "../components/dialogAddMaster";
import DialogAddEquipment from "../components/dialogAddEquipment";
import DialogAddLayout from "../components/dialogAddLayout";
function DiagramSVG() {
    const [mousePos, setMousePos] = useState({});
    const [equipment, setEquipment] = useState();
    const [point, setPoint] = useState();
    const [ObjSelected, setObjSelected] = useState();
    const [state, setState] = useState('');
    const [svgAxis, setSvgAxis] = useState({ x: 0, y: 15 });
    const [nameObj, setNameObj] = useState('');
    const [wObj, setWObj] = useState(0);
    const [hObj, setHObj] = useState(0);
    const [descObj, setDescObj] = useState('');
    const [translateCursor, setTranslateCursor] = useState();
    const [openAddMaster, setOpenAddMaster] = useState(false);
    const [openDialogAddEquipment, setOpenDialogAddEquipment] = useState(false);
    const [openDialogAddLayout, setOpenDialogAddLayout] = useState(false);
    const [selectLayout, setSelectLayout] = useState(false);
    const [layouts, setLayouts] = useState([]);
    const [layoutSelected, setLayoutSelected] = useState('');
    const [masterEquipment, setMasterEquipment] = useState([]);
    const [masterSelected, setMasterSelected] = useState('');
    const [scale, setScale] = useState(1);
    const [mode, setMode] = useState('edit');
    const API = import.meta.env.VITE_API;


    // const reducer = useSelector((state) => state.reducer);
    // const dispatch = useDispatch();
    useEffect(() => {

        // insertSvg();
        fetchLayout();
        // getEquipment();
        getMasterEquipment();
        const handleMouseMove = (event) => {
            const svg = document.getElementById('svg_selected')
            const w = svg?.getAttribute('w');
            const h = svg?.getAttribute('h');
            setMousePos({ x: event.offsetX, y: event.offsetY });
            setSvgAxis({ x: event.offsetX, y: event.offsetY });
            setTranslateCursor('translate(' + (event.offsetX - (w / 2)) + ',' + (event.offsetY - (h / 2)) + ')  ')

        };
        const svgLayout = document.getElementById('svg_layout')
        svgLayout?.addEventListener('mousemove', handleMouseMove);
        // let svg = document.querySelector("#svg_layout");
        // let rects = document.querySelectorAll("rect");
        // rects.forEach(rect => {
        //     rect.addEventListener("mouseenter", e => {
        //         svg?.appendChild(rect);
        //     });
        // });
        return () => {
            svgLayout?.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    async function fetchLayout() {
        const res = await ServiceGetLayouts();
        if (layoutSelected == '' || typeof layoutSelected == 'undefined') {
            setLayoutSelected(res[0])
            loadEquipment(res[0].layoutCode);
        }
        setLayouts(res);
    }

    const loadEquipment = (layoutCode) => {
        ServiceGetEquipment({ layoutCode: layoutCode }).then((res) => {
            var equipments = res;
            equipments.forEach(el => {
                if (el.svg.includes('{name}')) {
                    el.svg = el.svg.replace('{name}', el.name);
                }
            });
            setEquipment(res);
        })
    }
    // const getEquipment = () => {
    //     ServiceGetEquipment().then((res) => {
    //         console.log(res)
    //         // setEquipment(result);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }
    const getMasterEquipment = () => {
        ServiceGetMasterEquipment().then(item => {
            setMasterEquipment(item);
        })
    }
    const AddEquipment = async () => {
        if (ObjSelected == [] || ObjSelected == undefined) {
            alert('กรุณาเลือก');
            return false
        }
        // if (objSelected.objType == 'LINE' && objSelected.objAxis == 'X') {
        //     data = { objId: objSelected.objId, posId: 0, posX: mousePos.x, posY: mousePos.y, posW: (mousePos.x + parseInt(objSelected.objW)), posH: mousePos.y, posName: 'TEST', status: 'ACTIVE' }
        // } else if (objSelected.objType == 'LINE' && objSelected.objAxis == 'Y') {
        //     data = { objId: objSelected.objId, posId: 0, posX: mousePos.x, posY: mousePos.y, posW: mousePos.x, posH: mousePos.y + parseInt(objSelected.objH), posName: 'TEST', status: 'ACTIVE' }
        // } else {
        // if (ObjSelected != null) {
        //     const svg = document.getElementById('svg_selected');
        //     const w = svg?.getAttribute('w');
        //     const h = svg?.getAttribute('h');
        //     let data = { ObjId: ObjSelected.objId, PosX: (mousePos.x - (w / 2)), PosY: (mousePos.y - (h / 2)), PosW: ObjSelected.objW, PosH: ObjSelected.objH, PosName: 'TEST', Status: 'ACTIVE', }
        //     if ((state == '' || state == 'add')) {
        //         console.log(111);
        //         setOpenDialogAddEquipment(true);
        //         return false;
        //         let insertPoint = await ServiceAddEquipment(data);
        //         if (insertPoint.status) {
        //             getEquipment();
        //         }
        //     }
        // }
        if (mode == 'edit') {
            setOpenDialogAddEquipment(true);
        } else if (mode == 'remove') {

        }
    }
    // const RemovePoint = (posId) => {
    //     if (state == 'remove') {
    //         axios.get(`${API}/removepoint/${posId}`).then((res) => {
    //             getEquipment();
    //         }).catch((error) => {
    //             alert(error);
    //         });
    //     }
    // }
    // const initSVGpoint = (item, index = 0) => {
    //     switch (item.type) {
    //         case 'REAT':
    //             return <>
    //                 <text fill="red" x={item.x} y={item.y}>{item.name}</text>
    //                 <rect x={item.x} y={item.y} width={item.w} height={item.h} style={{ stroke: 'black', strokeWidth: '1' }} fill='white' />
    //             </>
    //         case 'CIRCLE':
    //             return <circle cx={item.x} cy={item.y} r={item.r} style={{ stroke: 'black', strokeWidth: '1' }} fill="red" />
    //         case 'LINE':
    //             if (item.axis == 'X') { // เส้นตรง แนวนอน
    //                 return <>
    //                     {/* <text fill="red" x={item.x} y={item.y}>x = {item.x}, w={item.w}, y={item.y}, h={item.h}</text> */}
    //                     <line x1={item.x} y1={item.y} x2={item.w} y2={item.y} style={{ stroke: 'black', strokeWidth: 3 }} />
    //                 </>
    //             } else { // เส้นตรง แนวตั้ง
    //                 return <>
    //                     {/* <text fill="green" x={item.x} y={item.y}>x = {item.x}, w={item.w}, y={item.y}, h={item.h}</text> */}
    //                     <line x1={item.x} y1={item.y} x2={item.x} y2={item.h} style={{ stroke: 'black', strokeWidth: 3 }} />
    //                 </>
    //             }
    //         default:
    //             break;
    //     }
    // }

    // function clearPoint() {
    //     axios.get(`${API}/clearpoint`).then((res) => {
    //         getEquipment();
    //     }).then((error) => {
    //         console.log(error);
    //     })
    // }
    function insertSvg() {
        if (nameObj.trim().length > 0 && descObj.trim().length) {
            axios.post(`${API}/insertpoint`, { title: nameObj, code: descObj, w: wObj, h: hObj }).then((res) => {
                FetchObject();
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    function removeSvg(objId) {
        axios.get(`${API}/removeobject/${objId}`).then((res) => {
            FetchObject();
        })
    }

    function handleDeleteMasterEquipment(masterId) {
        if (confirm('คุณต้องการลบใช่หรือไม่ ?')) {
            ServiceDeleteMasterEquipment(masterId).then(res => {
                if (res.status) {
                    getMasterEquipment();
                }
            })
        }
    }

    const removeEquipment = async (eqpId) => {
        const res = await ServiceDelEquipment({ eqpId: eqpId });
        if (res.status) {
            loadEquipment(layoutSelected.layoutCode);
        }
    }

    return (
        <div className="p-3">
            <b>
                ({mousePos.x}, {mousePos.y})
            </b>
            <b className="text-red-500 pl-3">
                Mode : {mode}
            </b>
            {/* <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <image href="../src/images/icon-dci.png" height="200" width="200" />
            </svg> */}
            <Stack direction={'row'} justifyContent={'end'} gap={1}>
                <Button variant="contained" onClick={() => setOpenDialogAddLayout(true)}><FaPlus />&nbsp;สร้างพื้นที่</Button>
                <Button variant="contained" onClick={() => setOpenDialogSeleteLayout(true)}>เลือกพื้นที่</Button>
                <Button variant="contained" onClick={() => setMode('edit')}>แก้ไข</Button>
                <Button variant='contained' color='error' size='small' onClick={() => {
                    setMode('remove');
                    setObjSelected([])
                }}><FaTrash />&nbsp;ลบจุด</Button>
                {/* <Button variant='contained' color='error' size='small' onClick={clearPoint}><FaTrash />&nbsp;ลบทั้งหมด</Button> */}
                <Button variant='contained' size='small' onClick={() => setOpenAddMaster(true)}>เพิ่มตัวเลือก</Button>
            </Stack>
            <Box border='1px solid black' p={2} className='select-none'>
                รายการพื้นที่
                <ul>
                    {layouts.map((itemLayout, index) => (
                        <li className="cursor-pointer" onClick={() => {
                            setLayoutSelected(itemLayout)
                            loadEquipment(itemLayout.layoutCode);
                        }}> - {itemLayout.layoutName} ({itemLayout.layoutWidth} x {itemLayout.layoutHeight})</li>
                    ))}
                </ul>
            </Box>
            <Grid container className="overflow-scroll flex-wrap ">

                <Grid    xs={2} className="bg-gray-300 border-2">
                    <Grid item xs={12} >
                        <Stack p={3}>
                            <TextField label='ขนาด' size="small" value={scale} onChange={(e) => setScale(e.target.value)} className="bg-white" focused />
                        </Stack>
                    </Grid>
                    <Grid container >
                        {
                            masterEquipment.map((item, index) => {
                                return <Grid key={index} item xs={3} maxWidth={50} minWidth={50} minHeight={50} className="bg-white cursor-pointer hover:bg-gray-50 hover:border-2 ">
                                    <span dangerouslySetInnerHTML={{ __html: item.objSvg }} onClick={() => {
                                        setMode('edit')
                                        setMasterSelected(item)
                                        setObjSelected(item);
                                    }}>
                                    </span>
                                </Grid>
                            })
                        }
                    </Grid>
                </Grid>
                <Grid container xs={10} className='bg-gray-500 flex justify-center select-none' >
                    <Grid item xs={12} className="text-white pl-3">
                        {layoutSelected.layoutName} ({layoutSelected.layoutCode}) {layoutSelected.layoutWidth} x {layoutSelected.layoutHeight}
                    </Grid>
                    <Grid item xs={12}>
                        <svg id='svg_layout' viewBox={`0 0 ${layoutSelected.layoutWidth} ${layoutSelected.layoutHeight}`} width={layoutSelected.layoutWidth} height={layoutSelected.layoutHeight} onClick={() => {
                            AddEquipment()
                        }} className="bg-red-100">
                            {
                                equipment?.map((item, index) => {
                                    return <g transform={item?.transform} onClick={() => mode == 'remove' ? removeEquipment(item.eqpId) : null}>
                                        <g style={{transform:`scale(${item.eqpScale})`}}  key={index} dangerouslySetInnerHTML={{ __html: item.svg }}></g>
                                    </g>
                                })
                            }
                            <g transform={translateCursor} >
                                <g style={{ transform: `scale(${scale})` }}>
                                    {
                                        ObjSelected != null && <svg id='svg_selected' w={ObjSelected?.objW} h={ObjSelected?.objH} dangerouslySetInnerHTML={{ __html: ObjSelected.objSvg }}></svg>
                                    }
                                </g>
                            </g>
                        </svg>
                    </Grid>
                </Grid>
            </Grid>
            {/* <svg width="1000px" height="500px" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
                <image href = "../src/images/layout_f_1.png" />
            </svg> */}
            {/* <Stack>
                <Typography>ชื่อพื้นที่ : </Typography>
                <Button variant='contained' size='small'>สร้างใหม่</Button>
                <Typography>รายการ : {state}</Typography>
                <Button variant='outlined' size='small' onClick={() => setState('add')}><FaPlus />&nbsp;เพิ่ม</Button>&nbsp;
                <Button variant='outlined' size='small' color='error' onClick={() => setState('remove')}><FaTrash />&nbsp;ลบ</Button>
                <Paper style={{ width: 500 }}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>

                                    {
                                        equipment?.map((item, index) => (
                                            <TableCell key={index} >
                                                <span dangerouslySetInnerHTML={{ __html: item.objSvg }} onClick={() => {
                                                    // dispatch({ type: 'OBJECT_SELECT', payload: item })
                                                    setObjSelected(item);
                                                }} ></span>
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Stack>

            <Box>
                <TextField label="ชื่อโมเดล" size='small' value={nameObj} onChange={(e) => setNameObj(e.target.value)} />
                <TextField label="W SVG" size='small' type='number' value={wObj} onChange={(e) => setWObj(parseInt(e.target.value))} />
                <TextField label="H SVG" size='small' type='number' value={hObj} onChange={(e) => setHObj(parseInt(e.target.value))} />
                <textarea placeholder='enter svg code' rows={5} style={{ width: '100%' }} onChange={(e) => setDescObj(e.target.value)}>{descObj}</textarea>
                <Button variant='contained' onClick={() => insertSvg()}>บันทึก</Button>
                <Button variant='contained' color='error' onClick={() => {
                    setNameObj('');
                    setDescObj('');
                    setWObj('');
                }}>ล้าง</Button>
            </Box> */}
            {/* <Box>
                <Typography variant="h5" color="initial">LIST OBJECT MASTER</Typography>
                <Table size="small">
                    <TableBody>
                        {
                            equipment?.length &&
                            equipment?.map((item: MLnsObjectMaster) => (
                                <TableRow key={item.objId}>
                                    <TableCell>{item.objName}</TableCell>
                                    <TableCell>{item.objSvg}</TableCell>
                                    <TableCell><IconButton onClick={() => removeSvg(item.objId)}><FaTrash /></IconButton></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

            </Box> */}
            <Box>
                {
                    masterEquipment.map((item, index) => (
                        <div onClick={() => handleDeleteMasterEquipment(item.objId)}>{item.objName}</div>
                    ))
                }
            </Box>
            <DialogAddMaster open={openAddMaster} close={setOpenAddMaster} />
            <DialogAddEquipment open={openDialogAddEquipment} close={setOpenDialogAddEquipment} master={masterSelected} mouse={mousePos} layout={layoutSelected} load={loadEquipment} scale={scale} />
            <DialogAddLayout open={openDialogAddLayout} close={setOpenDialogAddLayout} loadLayout={fetchLayout} />
        </div >
    );
}
export default DiagramSVG;