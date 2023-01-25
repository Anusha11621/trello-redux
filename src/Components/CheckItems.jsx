import { Button, Input, Menu, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import {readingCheckItemsData,deleteCheckItemsData,createChechItemData} from '../Store/store'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import '../App.css'
class CheckItems extends Component {
    constructor(props){
        super(props)
        this.state = {
            open:false,
            anchorEl:null,
            name:''
        }
    }
    componentDidMount(){
        this.props.readingCheckItemsData(this.props.id)
    }
  render() {
    // console.log(this.props.state.checkItemsData);
    const open = Boolean(this.state.anchorEl);
    const handleClick = (event) => {
        this.setState({
            anchorEl:event.currentTarget
        })
    };
    const handleClose = () => {
        this.setState({
            anchorEl:null
        })
    };
    return (
      <Stack>
        {
           this.props.state.checkItemsData?
           <>
            {
                this.props.state.checkItemsData
                .filter((data)=>{
                    // console.log(data.idList==this.props.listid); 
                    return data.idChecklist==this.props.id
                  })
                .map((data)=>{
                    return(
                        <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} margin='20px' >
                            <input type="checkbox" /> <label className="strikethrough">{data.name}</label>
                            <DeleteOutlineRoundedIcon onClick = {()=>{
                                this.props.deleteCheckItemsData(this.props.id, data.id)
                                // this.props.readingCheckItemsData(this.props.id)
                            }}></DeleteOutlineRoundedIcon>
                        </Stack>
                    )
                })
            }
           </>:<></> 
        }
        <Stack direction={'row'} display={'flex'} justifyContent={'center'}>
            <Button variant="outlined" size='small'
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >Add CheckItems </Button>
            <Menu
            id="basic-menu"
            anchorEl={this.state.anchorEl}
            open={open}
            onClose={handleClose}
        >
                <div className='d-flex justify-content-around'>
                    <div><p>Add Checklist</p></div>
                    <div onClick={handleClose} style={{cursor:'pointer'}} ><CloseRoundedIcon></CloseRoundedIcon></div>
                </div>
                <hr></hr>
                <div className='m-3'>
                    <TextField
                    label='Title'
                    size='small'
                    placeholder='Enter CheckList Title...'
                    onChange={(event)=>{
                        this.setState({
                            name:event.target.value
                        })
                    }}
                    value={this.state.name}
                    ></TextField>
                    <br></br>
                    <Button onClick={()=>{
                        this.setState({
                            name:''
                        })
                        this.props.createChechItemData(this.props.id,this.state.name)
                    }} >Add</Button>
                </div>
            
        </Menu>
        </Stack>
      </Stack>
    )
  }
}
const mapStateToProps = (state) =>{
    return {state: state}
  }
  
  const matchDispatchToProps = {
    readingCheckItemsData:readingCheckItemsData,
    deleteCheckItemsData:deleteCheckItemsData,
    createChechItemData:createChechItemData
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(CheckItems)