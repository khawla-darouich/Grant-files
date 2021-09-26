import React from 'react'
import { DataGrid, 
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector, } from '@mui/x-data-grid';
import axios from 'axios';
import { useState,useEffect } from 'react';
import {  makeStyles } from '@mui/styles';
import { Edit,DeleteRounded } from '@material-ui/icons';
import CustomizedMenu from '../../layout/menu/CustomizedDossierMenu';
import {SendRounded} from '@material-ui/icons';
import DialogSend from '../../Dialog/DialogSend';
export default function HistoryList(props) {

   

    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
          </GridToolbarContainer>
        );
      }

      const envoyer=()=>{
        console.log("props.envoyer")
        console.log(props.envoyer)
        return props.envoyer;
      }
     
    const columns = [
        { field: 'etape', headerName: 'R/A',sortable: false, width:90, headerClassName: 'super-app-theme--header',
            renderCell: (params)=>{
              if(params.row.etape==="approbation")
              {
                return <div style={{color:'#304954', fontWeight:"bold"}}>A</div>
              }
              else{
                return <div style={{color:'#5aacd0', fontWeight:"bold"}}>R</div>
              }
          } 
        },
        { field: 'emplacement',sortable: false,  headerName: 'Emplacement', width: 140 ,headerClassName: 'super-app-theme--header',
        renderCell: (params)=>{
            if(params.row.emplacement==="Guichet unique central")
            {
              return <div >GUC</div>
            }
            else{
              return <div >{params.row.emplacement}</div>
            }
        }  },
        { field: 'antenne',sortable: false, headerName: 'Antenne', width: 120 ,headerClassName: 'super-app-theme--header' },
        { field: 'saba', headerName: 'Saba', width: 150 ,headerClassName: 'super-app-theme--header' },
        { field: 'dateReception', headerName: 'Récéption', width: 140 ,headerClassName: 'super-app-theme--header' },
        { field: 'dateEnvoi',  headerName: 'Envoi', width: 130 ,headerClassName: 'super-app-theme--header',
         hide:envoyer()  },
        { field: 'retard',
         headerName:"Echéance",
         width:120,
         sortable: false,
         renderCell: (params)=>{
            if(params.row.retard>=0)
            {
              return <div style={{color:'green', fontWeight:"bold"}}>+{params.row.retard} jours</div>
            }
            else{
              return <div style={{color:'red', fontWeight:"bold"}}>{params.row.retard} jours</div>
            }
        } 
        },
        { field: 'action',  headerName: 'Envoyer', width: 130 ,headerClassName: 'super-app-theme--header',
          hide:!envoyer() ,
          renderCell: (params)=>{
            return <div className=" px-3">
              <DialogSend saba={params.row.saba} id={params.row.id} onSend={props.onSend}/>
            </div> 
        }
          
            
        },
       /* {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.getValue(params.id, 'firstName') || ''} ${
              params.getValue(params.id, 'lastName') || ''
            }`,
        },*/
      ];

      const useStyles = makeStyles({
        root: {
          '& .super-app-theme--header': {
                fontSize: 13,
                fontWeight:"bold"
                
          },
          "& .MuiDataGrid-renderingZone": {
            "& .MuiDataGrid-row": {
              "&:nth-child(2n)": { 
                backgroundColor: "rgb(251, 251, 255)" 
              }
            }
          }
        },
      });

     const root={
        "& .MuiDataGrid-renderingZone": {
          "& .MuiDataGrid-row": {
            "&:nth-child(2n)": { 
              backgroundColor: "rgba(235, 235, 235, .7)" 
            }
          }
        }
      }

      

      const classes = useStyles();
    
         
    return (
        <div style={{ height: 600, width: '100%' , padding:20}}>
            <DataGrid
                        className={classes.root}
                            rows={props.data}
                            columns={columns}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            checkboxSelection
                            style={{ backgroundColor: "#FFF"}}
                            components={{
                                Toolbar: CustomToolbar,
                              }}
                        />
        </div>
            
        
    )
}

