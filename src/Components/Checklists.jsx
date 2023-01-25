import { Button, Menu, Stack, TextField, Typography } from '@mui/material'
import React, { Component } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { connect } from 'react-redux';
import {gettingCheckListData,createChechListData,deleteCheckListData} from '../Store/store'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckItems from './CheckItems';
class Checklists extends Component {
    constructor(props){
        super(props)
        this.state = {
            open:false,
            anchorEl:null,
            name:''
        }
    } 
    componentDidMount(){
        this.props.gettingCheckListData(this.props.cardId)
    } 
  render() {
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
            this.props.state.checkListData?<>
            {
                this.props.state.checkListData.map((data)=>{
                    return(
                        <>
                        <Stack className='m-2' display={'flex'} flexDirection={'row'} justifyContent={'space-between'} sx={{ fontSize: 14,backgroundColor:'#faf8f7',padding:'5px',borderRadius:'5px',boxShadow:'1px  2px gray' }}  key={data.id}>
                            <Typography>
                                      {data.name}    
                            </Typography>
                            <DeleteOutlineRoundedIcon 
                            onClick={()=>{this.props.deleteCheckListData(data.id)}}
                            ></DeleteOutlineRoundedIcon>

                        </Stack>
                        <CheckItems id={data.id}></CheckItems>
                        <br></br>
                        </>
                    )
                })
            }
            </>:<>
            {/* <p className='text-center m-3' >Loading...</p> */}
            </>
        }
        <hr></hr>
        <Button variant="outlined" size='small'
        className='m-3'
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >Create Checklist</Button>
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
                        this.props.createChechListData(this.state.name,this.props.cardId)
                    }} >Add</Button>
                </div>
            
        </Menu>
      </Stack>
    )
  }
}
const mapStateToProps = (state) =>{
    return {state: state}
  }
  
  const matchDispatchToProps = {
    gettingCheckListData:gettingCheckListData,
    createChechListData:createChechListData,
    deleteCheckListData:deleteCheckListData
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(Checklists)