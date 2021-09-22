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
import CustomizedMenu from '../../layout/CustomizedMenu';
import {GroupOutlined,ArrowBackRounded,ArrowForwardRounded,KeyboardArrowDownRounded,FolderOutlined} from '@material-ui/icons';
export default function DossiersList() {

const [reload,setReload]=useState(true);
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

      

      function onDelete()
      { setReload(!reload);
          console.log(reload)
         
      }
    const [data,setData]= useState([]);
    const columns = [
        { field: 'etat', headerName: 'Etat',  headerClassName: 'super-app-theme--header',
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
                    <CustomizedMenu  id={params.row.id} emplacement={params.row.emplacement} cda={params.row.cda} saba={params.row.saba}  onDelete={onDelete} >

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
      function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

      useEffect(() => {
      axios.get('/dossiersList')
      .then(
        res=>{
            console.log(res);
            const data=res.data;
           console.log(data);
           const Dossiers=[];
           data.forEach(element => {
               
            const obj={
                id:element.dossier.id,
                etat:element.dossier.envoyer,
                emplacement:element.emplacement.designation,
                cda:element.dossier.cda.description,
                saba:element.dossier.saba,
                dateDepot:formatDate(element.dossier.dateCreation),
                postulant:element.dossier.agriculteur.nom+" "+element.dossier.agriculteur.prenom
              
            }
            Dossiers.push(obj);
        });
        setData(Dossiers);
        console.log("allo")
        console.log(data, Dossiers)
        },
        err=>{})
    }, [reload]);
      

      const classes = useStyles();
      console.log("rload")
         
      console.log(reload)
         
    return (
        <div style={{ height: 600, width: '100%' , padding:20}}>
            <DataGrid
                        className={classes.root}
                            rows={data}
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
