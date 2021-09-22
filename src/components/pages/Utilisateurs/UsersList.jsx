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
import CustomizedMenu from '../../layout/menu/CustomizedUserMenu';
export default function UsersList() {

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
        { field: 'id', headerName: 'ID', headerClassName: 'super-app-theme--header' },
        { field: 'nom', headerName: 'Nom', width: 130 ,headerClassName: 'super-app-theme--header' },
        { field: 'prenom', headerName: 'Prenom', width: 130 ,headerClassName: 'super-app-theme--header' },
        { field: 'email', headerName: 'Email', width: 180 ,headerClassName: 'super-app-theme--header' },
        { field: 'antenne', sortable: false, headerName: 'Antenne', width: 130 ,headerClassName: 'super-app-theme--header' },
        { field: 'role', sortable: false, headerName: 'Role', width: 110 ,headerClassName: 'super-app-theme--header' },
        { field: 'action',
         headerName:'Actions',
         width:110,
         sortable: false,
         renderCell: (params)=>{
           let role="";
           if(params.row.role=="Admin")
           {
             role=1
           } else if(params.row.role=="ADA")
           {
            role=2
           }else if(params.row.role=="GUC")
           {
            role=3
           }else if(params.row.role=="COMISSION")
           {
            role=4
           }
           let antenne="";
           if(params.row.antenne=="AAA")
           {
             antenne=1
           } else if(params.row.antenne=="BBB")
           {
            antenne=2
           }else if(params.row.antenne=="CCC")
           {
            antenne=3
           }
             return (
                <div className="actions">
                    <CustomizedMenu antenne={antenne} role={role} email={params.row.email} nom={params.row.nom} prenom={params.row.prenom} id={params.row.id} onDelete={onDelete} >

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
                fontSize: 15,
                
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

      useEffect(() => {
      axios.get('/UsersList')
      .then(
        res=>{
            console.log(res);
            const data=res.data;
           console.log(data);
           const Users=[];
           data.forEach(element => {
               
            const obj={
                id:element.id,
                nom:element.nom,
                prenom:element.prenom,
                email:element.email,
                antenne:element.antenne.abreviation,
                role:element.roles[0].role
              
            }
                Users.push(obj);
        });
        setData(Users);
        console.log("allo")
        console.log(data, Users)
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
