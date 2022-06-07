import React from "react";
import * as style from '../agent.module.css';
import { Modal, Button, Card } from 'react-bootstrap';
import Maskgroup56 from '../../../../static/images/Mask Group 56.png';

function AgentChat() {
    return (
        <div className="row">
            <div className="col-md-8">
                <div>
                    <p>Live Chat</p>
                    <label className={style.switch}>
                        <input type="checkbox" checked />
                        <span className={style.sliderRound}></span>
                    </label>
                </div>
                <Card className={style.AgentCard} style={{ borderRadius: "5px", boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)" }}>
                   <div className="row">
                    <div className="col-md-3">
                    <img src={Maskgroup56} alt="Maskgroup56" className={style.Maskgroup56} />
                    </div>
                    <div className="col-md-6">
                        <p><b>Marguerite Goodwin</b></p>
                        <p>This text is for sampple purpose only. it will be replace with the actual text later.</p>
                    </div>
                    <div className="col-md-3">
                        <p><b>Buyer</b></p>
                        <p>4 hrs ago</p>
                    </div>
                    </div>
                </Card>
            </div>
            <div className="col-md-4">

            </div>
        </div>
    )
}
export default AgentChat