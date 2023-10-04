import Axios from "axios";
const http = Axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
});

export default http;
export function ServiceAddMaster(param) {
    param.objW = parseInt(param.objW);
    param.objH = parseInt(param.objH);
    param.objMstNextDay = parseInt(param.objMstNextDay);
    param.objMstNextMonth = parseInt(param.objMstNextMonth);
    param.objMstNextYear = parseInt(param.objMstNextYear);
    console.log(param)

    return new Promise(resolve => {
        http.post(`/master/equipment/add`, param).then((res) => {
            resolve(res.data);
        })
    })
}
export function ServiceDeleteMasterEquipment(masterId) {
    return new Promise(resolve => {
        http.get(`/master/equipment/delete/${masterId}`);
    })
}
export function GetScoreBySupplier(param) {
    return http.post('/getScoreBySupplier', param)
}

// export function GetSupplier(param: any) {
//     return new Promise<AL_Vendor[]>(resolve => {
//         http.get('/supplier/list', param).then((res) => {
//             resolve(res.data);
//         })
//     })
// }

export function servGetEquipment() {
    return new Promise(resolve => {
        http.get(`/equipment`).then((res) => {
            resolve(res.data);
        })
    })
}
export function ServiceGetMasterEquipment() {
    return new Promise(resolve => {
        http.get(`/master/equipment`).then((res) => {
            resolve(res.data);
        })
    })
}

export function ServiceAddEquipment(param) {
    param.EqpTrigger =  param.EqpTrigger ? 1 : 0;
    console.log(param)
    return new Promise(resolve => {
        http.post(`/equipment/add`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function ServiceGetMasterEquipmentById(objId) {
    return new Promise(resolve => {
        http.get(`/master/equipment/id/${objId}`).then((res) => {
            resolve(res.data);
        })
    })
}
export function ServiceGetEquipment(param) {
    return new Promise(resolve => {
        http.post(`/equipment`, param).then((res) => {
            resolve(res.data);
        })
    })
}


export function ServiceCheckEquipment(param) {
    return new Promise(resolve => {
        http.post(`/equipment/check`, param).then((res) => {
            resolve(res.data)
        })
    })
}

export function ServiceDelEquipment(param) {
    return new Promise(resolve => {
        http.post(`/equipment/delete`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function ServiceAddLayout(param) {
    return new Promise(resolve => {
        http.post(`/layout/add`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function ServiceGetLayouts() {
    return new Promise(resolve => {
        http.get(`/layout`).then((res) => {
            resolve(res.data);
        })
    })
}