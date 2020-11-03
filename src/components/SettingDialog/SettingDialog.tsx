import * as React    from "react";
import template from "./SettingDialog.jsx";
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Label from '@material-ui/core/InputLabel';
import {SettingDialogProps, SettingDialogState} from '../../types';
import  {ButtonProps} from "@material-ui/core";

const ButtonLink = ({ ...props }: ButtonProps) => {
  return <Button  {...props} />;
};
class SettingDialog extends React.Component<SettingDialogProps, SettingDialogState> {
  constructor(props : SettingDialogProps)
  {
      super(props);
      this.state={
        showNewCardForm:false,
          title:'',
          description:'',
          type:'line', 
          color1:'blue',
          color2:'green'
      };
  }

  onCreateChart=(e: { preventDefault: () => void; })=>{
    console.log(111, "setting dialog state");
    console.log(this.state.type);
    let t = this.state.type;
    e.preventDefault(); //what is this?
    this.props.onCreateChart({
        title:this.state.title,
        description:this.state.description,
        type:t,
        color1:this.state.color1,
        color2:this.state.color2
    });
    this.props.closeDialog();
}


  onTitleChange = (e: { target: { value: any; }; })=>{
    this.setState({title:e.target.value});        
  }

onDescriptionChange = (e: { target: { value: any; }; })=> {
    this.setState({description:e.target.value});
}

onTypeChange = (e: { target: { value: any; }; })=>{
  this.setState({type:e.target.value});
}

onColor1Changed = (e: { target: { value: any; }; })=>{
  this.setState({color1:e.target.value});
}

onColor2Changed = (e: { target: { value: any; }; })=>{
  this.setState({color2:e.target.value});
}

resetForm(){
    this.setState({
        showNewCardForm:false,
        title:'',
        description:'',
        type:'line'
    });
}

  render() {
    return (
      <div>
      {(
        <Dialog open={true} id="dialog">
          <DialogTitle>Configuration</DialogTitle>
          <DialogContent>
          <div>
          <FormGroup onSubmit={this.onCreateChart}>
            <TextField 
            onChange={this.onTitleChange}
            // onFocus={this.onTitleFocus}
            value={this.state.title}
            type="text"
            placeholder="title"/>
            <TextField 
            onChange={this.onDescriptionChange}
            value={this.state.description}
            type="text"
            placeholder="description"
            />
            <Select onChange={this.onTypeChange} defaultValue="line">
                  <MenuItem key="line" value="line">line</MenuItem>
                  <MenuItem key="mountain" value="mountain">mountain</MenuItem>
                  <MenuItem key="scatter" value="scatter">scatter</MenuItem>
                  <MenuItem key="bubble" value="bubble">bubble</MenuItem>
                  {/* <MenuItem key="bar" value="bar">bar</MenuItem> */}
                  <MenuItem key="candle" value="candle">candle</MenuItem>
               </Select>       
               <Select defaultValue="blue" onChange={this.onColor1Changed}>
                  <MenuItem key="blue" value="blue">blue</MenuItem>
                  <MenuItem key="green" value="green">green</MenuItem>
                  <MenuItem key="red" value="red">red</MenuItem>
                  <MenuItem key="yellow" value="yellow">yellow</MenuItem>
                  <MenuItem key="purple" value="purple">purple</MenuItem>
               </Select>  
               <Select  defaultValue="blue" onChange={this.onColor2Changed}>
                  <MenuItem key="blue" value="blue">blue</MenuItem>
                  <MenuItem key="green" value="green">green</MenuItem>
                  <MenuItem key="red" value="red">red</MenuItem>
                  <MenuItem key="yellow" value="yellow">yellow</MenuItem>
                  <MenuItem key="purple" value="purple">purple</MenuItem>
               </Select>  
              <Button variant='contained'  color='primary' onClick={this.onCreateChart}>
                Save
              </Button>
            </FormGroup>
          </div>
          </DialogContent>
       </Dialog>
      )}
      </div>
    )
  }
}

export default SettingDialog;
