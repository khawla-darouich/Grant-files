import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
export default function DossierDetail(props) {

    const [dossier,setDossier]=useState({});
    const [data,setData]=useState(false)

    useEffect(() => {
        let url="/detailDossier/"+props.id
        axios.get(url)
        .then(res=>{
            const obj=res.data
            console.log(obj)
            setDossier(res.data)
            setData(true)
            console.log(window.location.href)
        },err=>{})
        
    }, [])

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

    return (
        <div className="card dossierDetail m-3 p-4">
          <div className="d-flex dossierHeader">
          <div >Code SABA :  <strong>{dossier.saba} </strong></div>
          <div > <small>Date du dépôt :  <strong>{formatDate(dossier.dateCreation)}</strong></small></div>
         
          </div>  <hr/>
         
              
              <div className="m-1">
              
              <div ><strong>Reference : </strong> {dossier.reference} </div>
              
              {data? <div>
                <div className="mx-2" ><small> <strong>CDA d'origin : </strong> {dossier.cda.antenne.abreviation}</small> </div>
                <div className="mx-2" ><small> <strong>CDA d'origin : </strong> {dossier.cda.description}</small> </div>
              <div ><strong>Rubrique : </strong> {dossier.sousRubrique.rubrique.desgnation} </div>
              <div className="mx-2" ><small> <strong>Sous-rubrique : </strong> {dossier.sousRubrique.designation}</small> </div>
            
              <div  ><strong className="textBlue">Agriculteur Postulant: </strong> 
              <div className="mx-2" ><small> <strong>Nom complet : </strong> {dossier.agriculteur.nom + " "+dossier.agriculteur.prenom  }</small> </div>
              <div className="mx-2" ><small> <strong>N° téléphone : </strong> {dossier.agriculteur.tel  }</small> </div>
              <div className="mx-2" ><small> <strong>CIN : </strong> {dossier.agriculteur.cin  }</small> </div>
               </div>
                </div> : <div></div>

              }


          </div>


        
            
        </div>
    )
}
