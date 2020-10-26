import * as React    from "react";
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import type {CSTreeViewProps} from '../../types';

class CSTreeView extends React.Component<CSTreeViewProps> {
   data = {
    id: 'root',
    name: 'CS-1',
    children: [
      {
        id: '1',
        name: 'Rev - 1',
      },
      {
        id: '3',
        name: 'Rev - 2',
      },
    ],
  };
  constructor(props : any)
    {
        super(props);
        this.state={
        };
    }

    onNodeSelect = (e : any)=>{
        if(e.target.textContent)
        {
          if(e.target.textContent==="rev-1" || e.target.textContent=="rev-2")
          {
            this.props.onSelectCsNode(e.target.textContent); 
          }
        }      
      }
     
  render() {
    return(
      <div>
      <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={this.onNodeSelect}
        >
      <TreeItem nodeId="1" label="cs-1">
        <TreeItem nodeId="2" label="rev-1" />
        <TreeItem nodeId="3" label="rev-2" />
      </TreeItem>
      <TreeItem nodeId="5" label="cs-2">
        <TreeItem nodeId="6" label="rev-1" />
        </TreeItem>
    </TreeView>

  </div>);
  }
}


export default CSTreeView;
