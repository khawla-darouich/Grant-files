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
                antenne:""
            },
            antenne:{},
            rubriques:[],
            sousRubriques:[],
            cdas:[]
        };


        const config={
            headers:{
              Authorization : "Bearer "+localStorage.getItem("tokenAuth")
            }
          }

          axios.get('currentUser',config)
        .then(
            res=>{
               const user=res.data;
             this.setState({
                     antenne:user.antenne,
                     input:{
                        antenne:user.antenne.abreviation
                     }
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
        
        console.log("change")
        console.log(this.state.input)
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
        console.log("before")
        console.log(this.state.input.cin)
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
                    
                }
                
            });
            
        },err=>{
            console.log(err)
        })
    }
    handleAgriculteur(event)
    {
        this.handleChange(event);
        
        console.log("after1")
        console.log(this.state.input.cin)
        this.handleChangeAgriculteur();
        
        console.log("after")
        console.log(this.state.input.cin)
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
        if(this.state.agriculteur)
        {
            dossier.agriculteur.id=this.state.agriculteur.id
            axios.post("addDossier",dossier,config)
            .then(res=>{
                console.log(res)
            })
        }else{
            const agriculteur={
                tel:this.state.input.tel,
                nom:this.state.input.nom,
                prenom:this.state.input.prenom,
                cin:this.state.cin
            }
            console.log("agriculteur")
            console.log(agriculteur)
            axios.post("agriculteurs",agriculteur,config)
            .then(res=>{
                const url="agriculteurByCin/"+agriculteur.cin;
                axios.get(url,config)
                .then(res=>{
                    dossier.agriculteur.id=res.data.id
                    axios.post("addDossier",dossier,config)
                    .then(res=>{
                        this.props.onSubmit();
                        console.log(res)
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
                            <div className="info mx-3 float-end"> 
                                <CachedRounded style={{cursor:'pointer'}} onClick={this.refresh}></CachedRounded>
                            </div>
                        </div>
                        <div className="row">
                        <div className={`form-group px-3 pt-3 d-flex col-md-6 `}>
                                <CreditCardRounded style={{ color : "#2d8bb4"}}/>
                                <input className={`form-control`} 
                                type="text" 
                                required 
                                id="cin" 
                                defaultValue={this.state.agriculteur ? this.state.agriculteur.cin : this.state.input.cin}
                                
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
                                id="tel" 
                                defaultValue={this.state.agriculteur ? this.state.agriculteur.tel : this.state.input.tel}
                                value={this.state.input.tel}
                                disabled={this.state.agriculteur ? true : false}
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
                                defaultValue={this.state.agriculteur ? this.state.agriculteur.nom : this.state.input.nom}
                                value={this.state.input.nom}
                                disabled={this.state.agriculteur ? true : false}
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
                                defaultValue={this.state.agriculteur ? this.state.agriculteur.prenom : this.state.input.prenom}
                                value={this.state.input.prenom}
                                disabled={this.state.agriculteur ? true : false}
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
                                defaultValue={this.props.saba ? this.props.saba : this.state.input.saba}
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
                                defaultValue={this.props.reference ? this.props.reference : this.state.input.reference}
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
                                defaultValue={this.props.antenne ? this.props.antenne : this.state.input.antenne}
                                value={this.state.input.antenne}
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
                                        defaultValue={this.props.cda ? this.props.cda : this.state.input.cda}
                                        value={this.state.input.cda}
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
                                        defaultValue={this.props.rubrique ? this.props.rubrique : this.state.input.rubrique}
                                        value={this.state.input.rubrique}
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
                                        defaultValue={this.props.sousRubrique ? this.props.sousRubrique : this.state.input.sousRubrique}
                                        value={this.state.input.sousRubrique}
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
                           
                        <button className="  float-end">  Créer </button> 
                    
                    </div>
                </form>
            </div>
        )
    }
}



