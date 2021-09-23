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
import {GroupOutlined,ArrowBackRounded,ArrowForwardRounded,KeyboardArrowDownRounded,FolderOutlined} from '@material-ui/icons';
export default function HistoryList() {

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

        // a and b are javascript Date objects
        function dateDiffInDays(a, b) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }


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
        { field: 'dateEnvoi',  headerName: 'Envoi', width: 140 ,headerClassName: 'super-app-theme--header' },
        { field: 'retard',
         headerName:"Retard",
         width:100,
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

    function calcRetard(dateR,dateE,etape,emplacement)
    {
        let diff=0;
        if(dateE)
        {
             diff=dateDiffInDays(new Date(dateR),new Date(dateE));
        }
        else{
             diff=dateDiffInDays(new Date(dateR),new Date());
        }
       
        console.log(data.etape)
        if(etape==="approbation")
        {
            if(emplacement==="Antenne")
            {
                return 3-diff;
            }else if(emplacement==="Guichet unique central")
            {
                return 2-diff;
            }
            else if(emplacement==="Commission")
            {
                return 15-diff;
            }
        }
        else if(etape==="realisation")
        {
            if(emplacement==="Antenne")
            {
                return 2-diff;
            }else if(emplacement==="Guichet unique central")
            {
                return 1-diff;
            }
            else if(emplacement==="Commission")
            {
                return 23-diff;
            }
        }
    }

      useEffect(() => {
      axios.get('/transactions')
      .then(
        res=>{
            console.log(res);
            const data=res.data;
           console.log(data);
           const Dossiers=[];
           data.forEach(element => {
               
            const obj={
                id:element.historique.id.dossierid+"-"+element.historique.id.emplacement_id,
                etape:element.etape.designation,
                emplacement:element.historique.emplacement.designation,
                antenne:element.historique.dossier.cda.antenne.abreviation,
                saba:element.historique.dossier.saba,
                dateReception:formatDate(element.historique.datereception),
                dateEnvoi:formatDate(element.historique.date_envoi),
                retard:calcRetard(element.historique.datereception,element.historique.date_envoi,element.etape.designation,element.historique.emplacement.designation)
               
               
              
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

