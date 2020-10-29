import * as React    from "react";
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import type {CSTreeViewProps} from '../../types';


const CSTreeView : React.FC<CSTreeViewProps> = props => 
{
  const onNodeSelect= (e : any)=>{
    console.log("cstreeview onNodeSelect");
    if(e.target.textContent)
    {
      console.log("text content ="+e.target.textContent);
      if(e.target.textContent==="rev-1" || e.target.textContent=="rev-2")
      {
        props.onSelectCsNode(e.target.textContent); 
      }
    }      
  };
  const st = {
        margin:"20px"
  };

  const element = <div><TreeView style={st}
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
    onNodeSelect={onNodeSelect}
    >
      <TreeItem nodeId="1" label="cs-1">
      <TreeItem nodeId="2" label="rev-1" />
      <TreeItem nodeId="3" label="rev-2" />
      </TreeItem>
      <TreeItem nodeId="5" label="cs-2">
      <TreeItem nodeId="6" label="rev-1" />
      </TreeItem>
    </TreeView>
  </div>;

    

  return element;
      };

      export default CSTreeView;
      

