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
import CustomizedMenu from '../../layout/menu/CustomizedDossierMenu';
import {GroupOutlined,ArrowBackRounded,ArrowForwardRounded,KeyboardArrowDownRounded,FolderOutlined} from '@material-ui/icons';
export default function DossiersList(props) {


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

      
    
    const columns = [
        { field: 'etat', headerName: 'Etat',sortable: false,  headerClassName: 'super-app-theme--header',
            renderCell: (params)=>{
              if(params.row.etat==true)
              {
                return <ArrowForwardRounded style={{color:'red'}}></ArrowForwardRounded>
              }
              else{
                return <ArrowBackRounded style={{color:'green'}}></ArrowBackRounded>
              }
          } 
        },
        { field: 'emplacement',sortable: false, headerName: 'Emplacement', width: 140 ,headerClassName: 'super-app-theme--header' },
        { field: 'cda',sortable: false, headerName: 'Cda', width: 100 ,headerClassName: 'super-app-theme--header' },
        { field: 'saba', headerName: 'Saba', width: 150 ,headerClassName: 'super-app-theme--header' },
        { field: 'dateDepot', headerName: 'Date dépôt', width: 150 ,headerClassName: 'super-app-theme--header' },
        { field: 'postulant',  headerName: 'Postulant', width: 140 ,headerClassName: 'super-app-theme--header' },
        { field: 'actions',
         headerName:"Actions",
         width:110,
         sortable: false,
         renderCell: (params)=>{
          
             return (
                <div className="actions">
                    <CustomizedMenu id={params.row.id} receptionner={props.receptionner? true:false} >

                    </CustomizedMenu>
                </div>
             );
         }
        }
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
