import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';
import SuccessPopup from "./successPopup";
import { connectAgent } from "../Api/formApi";
import { number } from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { upDateReferralFee } from "../Api/ListingApi";

function RefrelFee(props) {
    const { show, toggleShow, agentId } = props;
    const [success, setSucess] = useState(false);
    const [agentName, setAgentName] = useState('')
    const toggleSuccess = () => setSucess(p => !p);
    const [refrelFee, setRefrelFee] = useState(null)

    useEffect(()=>{
        if(props.referralAmount !== undefined){
            setRefrelFee(props.referralAmount)
        }
    },[props.referralAmount])

    const handleRefrel = (e) => {
        console.log(e.target.value)
        if(e.target.value.length <=2){
            setRefrelFee(e.target.value)
        }
    }

    const transferApis = async () => {
        if (props.updateFee === "updateFee") {
            let data = {
                referral_fee: refrelFee
            }
            await upDateReferralFee(props.propertyId, data).then((res) => {
                toggleShow()
                props.inBound()
                props.outBound()
                toast.success("Referral fee updated successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                });
            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            let data = []
            agentId.map((item) => {
                if (item.is_active === false) {
                    data.push(item._id)
                }
            })
            if (data.length <= 1) {
                let value = agentId.findIndex((a) => a._id === data[0])
                console.log('index', value)
                setAgentName(agentId[value].name)
            }
            else {
                setAgentName('Agents')
            }
            console.log('agent id', data)
            let createPostData = {
                "prospect_id": props.data._id,
                "agent_id": data,
                "referral_fee": refrelFee,
            };
            console.log("refrelfee...", createPostData);
            await connectAgent(createPostData)
                .then((res) => {
                    console.log("--createRes--", res)
                    toggleSuccess()
                    setTimeout(()=>toggleSuccess(),3000)
                    toggleShow()
                }).catch(() => {
                    toggleShow()
                    toast.error('Already applied request', {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                    });

                })
        }

    }
    const hanldeClose = () => {
        toggleShow()
    }

    return (
        <div>
            <ToastContainer />
            <SuccessPopup success={success} agentName={agentName} toggleSuccess={toggleSuccess} />
            <Modal show={show} onHide={hanldeClose} className="special_modal" dialogClassName="my-modal" size="md">
                <Modal.Header closeButton className="team-popup-margin teampopup-title"  >
                    <Modal.Title className='form-field-label form-label-team '><h5 className='teamText'>Referral  Fee</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body className="team-popup-margin pb-0" >
                    <div className='row mb-5'>
                        <div className="col-md-6">
                            <input type="number" name="createGroup"  value={refrelFee} onChange={handleRefrel} placeholder='Referral fee' className={style1.RefrelFee} /> %
                        </div>

                        <div className="col-md-6">
                            <Button variant="primary" onClick={transferApis} className={style1.refsubmitbut}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default RefrelFee