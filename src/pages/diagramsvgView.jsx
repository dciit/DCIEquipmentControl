import { Box, Button, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from 'react-icons/fa';
import { ServiceGetEquipment, ServiceAddEquipment, servGetEquipment, ServiceGetMasterEquipment, ServiceDeleteMasterEquipment, ServiceGetLayouts } from "../Service";
import DialogAddMaster from "../components/dialogAddMaster";
import DialogAddEquipment from "../components/dialogAddEquipment";
import DialogCheckEquipment from "../components/dialogCheckEquipment";
function DiagramSVGView() {
    const [equipment, setEquipment] = useState();
    const [eqpSelected, setEqpSelected] = useState();
    const [openCheckEqp, setOpenCheckEqp] = useState(false);
    const [data, setData] = useState([]);
    // const reducer = useSelector((state) => state.reducer);
    // const dispatch = useDispatch();
    useEffect(() => {
        getLayout();
        // getEquipment();
    }, []);

    async function getLayout() {
        const res = await ServiceGetLayouts();
        var init = [];
        var i = 0;
        while (i < res.length) {
            var item = res[i];
            const eqp = await ServiceGetEquipment({ layoutCode: item.layoutCode });
            eqp.map(el => {
                if (el.svg.includes('{name}')) {
                    el.svg = el.svg.replace('{name}', el.name);
                }
                if (el.svg.includes('{color}')) {
                    el.svg = el.svg.replace('{color}', el.status == 'true' ? 'green' : 'red');
                }
                if (el.status == null) {
                    el.status = 'false';
                }
            })
            item.data = eqp;
            init.push(item);
            i++;
        }
        setData(init);
    }

    return (
        <div >
            <Grid container>

                {
                    data.map((item) => {
                        return <Grid item xs={6}>
                            <span>{item.layoutName} ({item.layoutCode})</span>
                            <svg id='svg_layout' viewBox={`0 0 ${item.layoutWidth} ${item.layoutHeight} `}>
                                {
                                    item.data.map((item, index) => {
                                        return <g transform={item?.transform} onClick={() => {
                                            if (item.eqpTrigger == 1) {
                                                setEqpSelected(item);
                                                setOpenCheckEqp(true);
                                            }
                                        }}>
                                            <g key={index} style={{ transform: `scale(${item.eqpScale})` }} dangerouslySetInnerHTML={{ __html: item.svg }}></g>
                                        </g>
                                    })
                                }
                            </svg>
                        </Grid>

                    })
                }


            </Grid>
            <DialogCheckEquipment open={openCheckEqp} close={setOpenCheckEqp} eqp={eqpSelected} load={getLayout} />
        </div >
    );
}
export default DiagramSVGView;