import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {CachedRounded} from '@material-ui/icons';
import axios from 'axios';
export default class NoteForm extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
      input:{}
    };

    this.refresh=this.refresh.bind(this);
    this.handleChange=this.handleChange.bind(this);
  

  }
  handleChange(event)
  {
      let input=this.state.input;
      input[event.target.name]= event.target.value;
      this.setState({
          input
      });
      console.log(this.state.input)
  }

  handleSubmit=(e)=>
  {
    
    e.preventDefault();
    const config={
      headers:{
        Authorization : "Bearer "+localStorage.getItem("tokenAuth")
      }
    }
    const note={
      objet:this.state.input.objet,
      note:this.state.input.note,
      dossier:{id:this.props.id}
    }
  console.log(this.state.input)
   axios.post("addNote",note,config)
   .then(res=>{
       console.log(res)
      this.props.handleClose();
      
   },err=>{})
    
  }

  refresh()
  {
    this.setState({
      input:{
        objet:"",
        note:""
      }
    })
  }

  render()
  {
    return (
        
            <form className='px-3 pb-3 pt-3 row card m-3 ' onSubmit={this.handleSubmit}>
                <div className="header   d-flex ">
                            Créer une note
                            
                                <div className="info float-end"> 
                                <CachedRounded style={{cursor:'pointer'}} onClick={this.refresh}></CachedRounded>
                                </div>      
                            
                            
                </div>
                
                    <TextField
                     className="  mt-2"
                      id="standard-basic" 
                      label="Objet" 
                      variant="standard"
                      required 
                      id="objet" 
                      name="objet"
                      value={this.state.input.objet}
                      onChange={this.handleChange}
                      /> 
                
                      <TextField
                        className="  mt-2"
                        id="standard-textarea"
                        label="Note"
                        multiline
                        variant="standard"
                        required 
                        id="note" 
                        name="note"
                        value={this.state.input.note}
                        onChange={this.handleChange}
                      />
                
                <div className={`mt-1 float-end btn `}>
                           
                        <button className="  float-end"> Ajouter  </button> 
                    
                    </div>
                
            </form>
        
      );
  }
}
