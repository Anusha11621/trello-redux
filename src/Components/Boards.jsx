import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { connect } from 'react-redux';
import {gettingBoardsData,creatBoardsData} from '../Store/store'
import { Dialog, DialogContent, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
class Boards extends Component {
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
        this.props.gettingBoardsData()
    }
  render() {
    // console.log(this.state)
    return (
      <Stack p={5}>
        {
            this.props.state.boardsData?
            <Stack display={'flex'} flexDirection='row' flexWrap={'wrap'} gap={3}>
            {
                this.props.state.boardsData.map((data)=>{
                    return(
                        <Link to={`${data.id}`} style={{textDecoration:'none'}}  key={data.id}>
                            <Card sx={{width:'180px',height:'100px',backgroundColor:'#2585d9',textAlign:'center',cursor:'pointer' }} >
                                <CardContent>
                                    <Typography sx={{ fontSize: 14,padding:2.8 }} color='whitesmoke'  gutterBottom>
                                    {data.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })
            }

            <Card sx={{width:'180px',height:'100px',backgroundColor:'#f2f9ff',cursor:'pointer' }} 
            onClick={this.handelOpen}
             >
                <CardContent>
                    <Typography sx={{ fontSize: 14,padding:2.8 }}  gutterBottom>
                    Create a Board
                    </Typography>
                </CardContent>
            </Card>

            <Stack >
            
                <Dialog open={this.state.open} onClose={this.handelClose}>
                <Typography  sx={{textAlign:'center'}} pt={1}>Create Board</Typography>
                <hr></hr>
                <DialogContent>
                
                <TextField
                    autoFocus   
                    id="outlined-basic"
                    label="Board Title"
                    type="text"
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder='Enter Board Title.....'
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
                            this.props.creatBoardsData(this.state.name)
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
        </Stack>:<p>Loading....</p>
        }
      </Stack>
    )
  }
}

const mapStateToProps = (state) =>{
    return {state: state}
  }
  
  const matchDispatchToProps = {
    gettingBoardsData:gettingBoardsData,
    creatBoardsData:creatBoardsData,
    
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(Boards)
  