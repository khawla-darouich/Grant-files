import axios from 'axios';
import React, { Component } from 'react'
import { TextField,FormControl,Select,MenuItem,InputLabel } from '@mui/material';
import {CachedRounded,Room,Mail,Person,CreditCardRounded,PhoneIphoneRounded,FlagOutlined,PersonOutlineRounded,VpnKeyRounded,InvertColorsRounded} from '@material-ui/icons';
export default class DossierForm extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            input: {
                tel:this.props.tel,
                cda:this.props.cda,
                rubrique:this.props.rubrique,
                sousRubrique:this.props.sousRubrique,
                cin:this.props.cin,
                nom:this.props.nom,
                prenom:this.props.prenom,
                saba:this.props.saba,
                reference:this.props.reference,
            },
            cin:this.props.cin,
            antenne:"",
            rubriques:[],
            sousRubriques:[],
            cdas:[],
            dossier:{}
        };



        const config={
            headers:{
              Authorization : "Bearer "+localStorage.getItem("tokenAuth")
            }
          }

          if(this.props.edit===true)
          {
              const config={
                headers:{
                  Authorization : "Bearer "+localStorage.getItem("tokenAuth")
                }
              }
           
            const url="sousRubriqueByRubrique/"+this.props.rubrique
            
            axios.get(url,config)
                .then(res=>{
                    this.setState({
                        sousRubriques:res.data
                    })
                    
                },err=>{})
         //     const  url="detailDossier/"+this.props.id
             
          }
          axios.get('currentUser',config)
        .then(
            res=>{
               const user=res.data;
             this.setState({
                     antenne:user.antenne.abreviation,
                     
                })

                const url="cdaByAntenne/"+user.antenne.id
                axios.get(url,config)
                .then(res=>{
                    this.setState({
                        cdas:res.data
                    })
                },err=>{})
            }).catch(err=>{
                console.log(err)
            })

            axios.get("rubriques",config)
            .then(res=>{
                this.setState({
                    rubriques:res.data._embedded.rubriques
                })
            },err=>{})

           
            this.refresh=this.refresh.bind(this);
            this.handleChange=this.handleChange.bind(this);
            this.handleChangeRubrique=this.handleChangeRubrique.bind(this);
            this.handleRubrique=this.handleRubrique.bind(this);
            this.handleChangeAgriculteur=this.handleChangeAgriculteur.bind(this);
            this.handleAgriculteur=this.handleAgriculteur.bind(this);
            
       
    }

    handleChange(event)
    {
        let input=this.state.input;
        input[event.target.name]= event.target.value;

        if(event.target.name==="cin")
        {
            this.setState({
                cin:event.target.value,
                input
            });
        }
        this.setState({
            input
        });
        
    }
    
    handleChangeRubrique()
    {
        const config={
            headers:{
              Authorization : "Bearer "+localStorage.getItem("tokenAuth")
            }
          }
       
        const url="sousRubriqueByRubrique/"+this.state.input.rubrique
        
        axios.get(url,config)
            .then(res=>{
                this.setState({
                    sousRubriques:res.data
                })
                
            },err=>{})
        
    }
    
     handleRubrique(event)
    {
        this.handleChange(event);
            this.handleChangeRubrique();
            
    }

    handleChangeAgriculteur()
    {
        const config={
            headers:{
              Authorization : "Bearer "+localStorage.getItem("tokenAuth")
            }
          }
        const url="agriculteurByCin/"+this.state.input.cin;
        axios.get(url,config)
        .then(res=>{
                const agr=res.data
            this.setState({
                agriculteur:agr,
                input:{
                    tel:agr.tel,
                    nom:agr.nom,
                    prenom:agr.prenom,
                    cin:agr.cin,
                    saba:this.state.input.saba,
                    reference:this.state.input.reference,
                    cda:this.state.input.cda,
                    sousRubrique:this.state.input.sousRubrique,
                    rubrique:this.state.input.rubrique,
                    
                }
                
            });
            
        },err=>{
            console.log(err)
        })
    }
    handleAgriculteur(event)
    {
        this.handleChange(event);
        
        this.handleChangeAgriculteur();
        
    }

    refresh()
    {
        this.setState({
            input: {
               
            }
        });
    }

    handleSubmit= (e)=>{
        
        e.preventDefault();
        const dossier={
            saba:this.state.input.saba,
            reference:this.state.input.reference,
            cda:{id:this.state.input.cda},
            sousRubrique:{id:this.state.input.sousRubrique},
            agriculteur:{}
        };
        const config={
            headers:{
              Authorization : "Bearer "+localStorage.getItem("tokenAuth")
            }
          }
        if(this.props.edit===true)
        {
            const url="agriculteurByCin/"+this.state.input.cin;
                axios.get(url,config)
                .then(res=>{
                    dossier.agriculteur.id=res.data.id
                    const url="updateDossier/"+this.props.id
                    axios.put(url,dossier,config)
                    .then(res=>{
                        this.props.onSubmit();
                    })
                })
        }else if(this.state.agriculteur)
        {
            dossier.agriculteur.id=this.state.agriculteur.id
            axios.post("addDossier",dossier,config)
            .then(res=>{
                this.props.onSubmit();
                
            })
        }else{
            const agriculteur={
                tel:this.state.input.tel,
                nom:this.state.input.nom,
                prenom:this.state.input.prenom,
                cin:this.state.cin
            }
            axios.post("agriculteurs",agriculteur,config)
            .then(res=>{
                const url="agriculteurByCin/"+agriculteur.cin;
                axios.get(url,config)
                .then(res=>{
                    dossier.agriculteur.id=res.data.id
                    axios.post("addDossier",dossier,config)
                    .then(res=>{
                        this.props.onSubmit();
                    })
                })
            })
        }
        
     }

    render() {
        return (
            <div>
                <form className='px-5 pt-2 row' onSubmit={this.handleSubmit}>
                    <div className="card col-12  p-3">
                        <div className="header   d-flex col-12">
                            Informations personnelles de l'agriculteur
                            {!this.props.id? 
                                <div className="info mx-3 float-end"> 
                                <CachedRounded style={{cursor:'pointer'}} onClick={this.refresh}></CachedRounded>
                                </div>      
                            :null}
                            
                        </div>
                        <div className="row">
                        <div className={`form-group px-3 pt-3 d-flex col-md-6 `}>
                                <CreditCardRounded style={{ color : "#2d8bb4"}}/>
                                <input className={`form-control`} 
                                type="text" 
                                required 
                                id="cin" 
                                disabled={this.props.id? true:false}
                                value={this.state.input.cin}
                                name="cin"
                                placeholder="Numéro d'identité nationale" 
                                onChange={this.handleAgriculteur} />

                            </div>
                            <div className={`form-group d-flex px-3 pt-3 col-md-6 `}>
                                <PhoneIphoneRounded style={{ color : "#2d8bb4"}}/>
                                <input className={`form-control`} 
                                type="text" 
                                required 
                              
                                
                                value={this.state.input.tel}
                                disabled={this.state.agriculteur ? true : false || this.props.id? true:false}
                                name="tel"
                                placeholder="Téléphone" 
                                onChange={this.handleChange} />

                            </div>
                            <div className={`form-group px-3  pt-3 d-flex col-md-6 `}>
                                <PersonOutlineRounded style={{ color : "#2d8bb4"}}/>
                                <input className={`form-control`} 
                                type="text" 
                                required 
                                id="nom" 
                                
                                value={this.state.input.nom}
                                disabled={this.state.agriculteur ? true : false || this.props.id? true:false}
                                name="nom"
                                placeholder="Nom" 
                                onChange={this.handleChange} />

                            </div>
                            <div className={`form-group d-flex px-3  pt-3 col-md-6 `}>
                                <PersonOutlineRounded style={{ color : "#2d8bb4"}}/>
                                <input className={`form-control`} 
                                type="text" 
                                required 
                                id="prenom" 
                                
                                value={this.state.input.prenom}
                                disabled={this.state.agriculteur ? true : false || this.props.id? true:false}
                                name="prenom"
                                placeholder="Prénom" 
                                onChange={this.handleChange} />

                            </div>
                            </div>
                    </div>

                    <div className="card col-12 mt-3 p-3">
                        <div className="header   d-flex col-12">
                            Informations de dossier
                            <div className="info mx-3 float-end"> 
                                <CachedRounded style={{cursor:'pointer'}} onClick={this.refresh}></CachedRounded>
                            </div>
                        </div>
                        <div className="row">
                        <div className={`form-group px-3 pt-3 d-flex col-md-6 `}>
                                <VpnKeyRounded style={{ color : "#2d8bb4"}}/>
                                <input className={`form-control`} 
                                type="text" 
                                required 
                                id="saba" 
                                
                                value={this.state.input.saba}
                                name="saba"
                                placeholder="Saba" 
                                onChange={this.handleChange} />

                            </div>
                            <div className={`form-group d-flex px-3 pt-3 col-md-6 `}>
                                <InvertColorsRounded style={{ color : "#2d8bb4"}}/>
                                <input className={`form-control`} 
                                type="text" 
                                required 
                                id="reference" 
                                
                                value={this.state.input.reference}
                                name="reference"
                                placeholder="Référence" 
                                onChange={this.handleChange} />

                            </div>
                            <div className={`form-group px-3  pt-3 d-flex col-md-6 `}>
                                <Room style={{ color : "#2d8bb4"}}/>
                                <input className={`form-control`} 
                                type="text" 
                                required 
                                id="antenne" 
                                
                                value={this.state.antenne}
                                name="antenne"
                                placeholder="antenne" 
                                onChange={this.handleChange}
                                disabled={true} />

                            </div>
                            <div className={`form-group d-flex px-3  pt-3 col-md-6 `}>
                                <FlagOutlined style={{ color : "#2d8bb4"}}/>
                                <FormControl  style={{width: "100%"}} size="small" >
                                    
                                        <Select
                                    
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name="cda"
                                        value={this.state.input.cda || ''}
                                      
                                        onChange={this.handleChange}
                                        >
                                     
                                     
                                     { this.state.cdas.map((cda)=>(
                                              
                                              <MenuItem value={cda.id} >{cda.description}</MenuItem>
                                     ))}
                                    
                                          
                                        </Select>
                                    </FormControl>

                            </div>
                            <div className={`form-group d-flex px-3  pt-3 col-md-6 `}>
                                <FlagOutlined style={{ color : "#2d8bb4"}}/>
                                <FormControl  style={{width: "100%"}} size="small" >
                                    
                                        <Select
                                    
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name="rubrique"
                                        value={this.state.input.rubrique || ''}
                                        
                                        onChange={this.handleRubrique}
                                        >
                                     
                                     
                                     { this.state.rubriques.map((rubrique)=>(
                                              
                                              <MenuItem value={rubrique.id} >{rubrique.desgnation}</MenuItem>
                                     ))}
                                    
                                          
                                        </Select>
                                    </FormControl>

                            </div>
                            <div className={`form-group d-flex px-3  pt-3 col-md-6 `}>
                                <FlagOutlined style={{ color : "#2d8bb4"}}/>
                                <FormControl  style={{width: "100%"}} size="small" >
                                    
                                        <Select
                                    
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name="sousRubrique"
                                        
                                        value={this.state.input.sousRubrique || ''}
                                        onChange={this.handleChange}
                                        >
                                     
                                     
                                     { this.state.sousRubriques.map((sousRubrique)=>(
                                              
                                              <MenuItem value={sousRubrique.id} >{sousRubrique.designation}</MenuItem>
                                     ))}
                                    
                                          
                                        </Select>
                                    </FormControl>

                            </div>
                            </div>
                    </div>
                    <div className={`mt-1 float-end btn `}>
                           
                        <button className="  float-end">{!this.props.id? "Créer":"Modifier"}   </button> 
                    
                    </div>
                </form>
            </div>
        )
    }
}



