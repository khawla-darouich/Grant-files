import React from 'react'
import './account.css'
import { AccountCircleRounded,RoomOutlined } from '@material-ui/icons';
import { BsBoxArrowLeft,BsChevronDown ,BsPerson,BsEnvelope} from "react-icons/bs";
export default function AccountDetail(props) {
    return (
        <div className="card">
            
            <div className=" m-3 accountHeader ">
                <div className="accountIcon">
               <AccountCircleRounded style={{fontSize:45}} />
                </div>
                <div className="accountName mx-2 pt-3">
                    <div className="userName text-black ">{props.user.prenom} {props.user.nom} </div>
                    <div className="role text-black-50 textSm">Agent de {props.user.roles[0].role}</div>
                </div>
            </div>

            <div className="accountInfo m-2">
                <div className="blockTitle text-black-50">
                    Informations personnelles
                </div>
                <div className="d-flex mt-2 accountInfoLine">
                    <BsPerson className="mx-2" style={{fontSize:20}}/> {props.user.prenom} {props.user.nom}
                </div>
                <div className="d-flex mt-2 accountInfoLine">
                    <BsEnvelope className="mx-2" style={{fontSize:20}}/>{props.user.email}
                </div>
            </div>
            <div className="accountInfo m-2">
                <div className="blockTitle text-black-50">
                    Autres
                </div>
                <div className="d-flex mt-2 accountInfoLine">
                    <RoomOutlined className="mx-2" style={{fontSize:20}}/>{props.user.antenne.abreviation}
                </div>
                <div className="d-flex mt-2 accountInfoLine">
                    <BsPerson className="mx-2" style={{fontSize:20}}/> {props.user.roles[0].role}
                </div>
            </div>
        </div>
    )
}
