import * as React    from "react";
import template from "./SettingDialog.jsx";
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
          <form className="task-list-form" onSubmit={this.onCreateChart}>
          <input className="form-control"
          onChange={this.onTitleChange}
          // onFocus={this.onTitleFocus}
          value={this.state.title}
          type="text"
          placeholder="title"/>
          <input className="form-control"
          onChange={this.onDescriptionChange}
          value={this.state.description}
          type="text"
          placeholder="description"
          />
          type:
              <select className="form-control" onChange={this.onTypeChange}>
              {/* {CHART_TYPES.map(type=>(
                  <option key={type} value={type}>
                      {type}
                  </option>))} */}
                  <option key="line" value="line">line</option>
                  <option key="mountain" value="mountain">mountain</option>
                  <option key="scatter" value="scatter">scatter</option>
                  <option key="bubble" value="bubble">bubble</option>
                  <option key="bar" value="bar">bar</option>
                  <option key="candle" value="candle">candle</option>
               </select>       
               <select className="form-control" onChange={this.onColor1Changed}>
                  <option key="blue" value="blue">blue</option>
                  <option key="green" value="green">green</option>
                  <option key="red" value="red">red</option>
                  <option key="yellow" value="yellow">yellow</option>
                  <option key="purple" value="purple">purple</option>
               </select>  

               <select className="form-control" onChange={this.onColor2Changed}>
                  <option key="blue" value="blue">blue</option>
                  <option key="green" value="green">green</option>
                  <option key="red" value="red">red</option>
                  <option key="yellow" value="yellow">yellow</option>
                  <option key="purple" value="purple">purple</option>
               </select>  
              <ButtonLink variant='contained'  color='primary' type="submit">
                Save
            </ButtonLink>
            </form>
          </div>
          </DialogContent>
       </Dialog>
      )}
      </div>
    )
  }
}

export default SettingDialog;
