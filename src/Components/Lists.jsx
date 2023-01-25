import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import {gettingListsData,createListData,deleteListData} from '../Store/store'
import { connect } from 'react-redux';
import { Dialog, DialogContent, TextField } from '@mui/material';
import Cards from './Cards';
class Lists extends Component {
    constructor(props){
        super(props)
        this.state ={
            name : '',
            open : false
        }
    }
    handelClose = ()=>{
        this.setState({
            open:false
        })
    }
    handelOpen = ()=>{
        this.setState({
            open:true
        })
    }
    componentDidMount(){
        this.props.gettingListsData(this.props.match.params.id)
    }
  render() {
    // console.log(this.props.state.listsData);
    return (
      <Stack  p={5} >
        <Stack display={'flex'} flexDirection={'row'} flexWrap='wrap' gap={3} >
            {
                this.props.state.listsData?<>
                    {
                        this.props.state.listsData.map((data)=>{
                            return(
                                <Card sx={{ width: "325px",backgroundColor:'#faf5f5',height:'100%' }} key={data.id} >
                                    <CardContent>
                                        <Stack display={'flex'} flexDirection='row' justifyContent='space-between' alignItems={'center'}>
                                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                                <b>{data.name}</b>
                                            </Typography>
                                            <DeleteIcon onClick={()=>{this.props.deleteListData(data.id)}} sx={{cursor:'pointer'}}></DeleteIcon>
                                        </Stack>
                                        <Cards listid = {data.id}></Cards>
                                    </CardContent>    
                                </Card>
                            )
                        })
                    }
                </>:<></>
            }
            <Button variant="outlined" sx={{height:'40px', width:'200px'}} onClick={this.handelOpen}>+ Add Another List</Button>
            <Stack >
            
                <Dialog open={this.state.open} onClose={this.handelClose}>
                <Typography  sx={{textAlign:'center'}} pt={1}>Create List</Typography>
                <hr></hr>
                <DialogContent>
                
                <TextField
                    autoFocus   
                    id="outlined-basic"
                    label="List Title"
                    type="text"
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder='Enter List Title.....'
                    onChange={(event)=>{
                        this.setState({
                            name:event.target.value
                        })
                    }}
                    value={this.state.name}
                />

                    </DialogContent>
                    <Stack direction={'column'} m={3}>
                        <Button variant="contained" size='small' onClick={()=>{
                            this.props.createListData(this.state.name,this.props.match.params.id)
                            this.handelClose()
                            this.setState({
                                name:''
                            })
                        }}>Create</Button>
                        <br></br>
                        <Button variant="outlined" size='small' onClick={this.handelClose}>Cancel</Button>
                    </Stack>
                </Dialog>
            </Stack>
        </Stack>
      </Stack>
    )
  }
}

const mapStateToProps = (state) =>{
    return {state: state}
  }
  
  const matchDispatchToProps = {
    gettingListsData:gettingListsData,
    createListData:createListData,
    deleteListData:deleteListData
    
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(Lists)