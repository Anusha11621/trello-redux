import { Button, CardContent, Dialog, DialogContent, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { Component } from 'react'
import Checklists from './Checklists';
import { connect } from 'react-redux';
import {gettingCardsData,createCardData,deleteCardsData} from '../Store/store'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
class Cards extends Component {
    constructor(props){
        super(props)
        this.state ={
          name : '',
          open : false,
          addacard:false,
          add:false,
          value:'',
          cardId:''
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
    handeladdOpen = ()=>{
      this.setState({
          addacard:true,
      })
    }
    handleaddClose = () => {
        this.setState({
            addacard:false,
            add:false,
            open:false,
        })
    }
    componentDidMount(){
        this.props.gettingCardsData(this.props.listid)
    }
  render() {
    console.log(this.props.cardsData);
    return (
      <Stack>
        {
            this.props.state.cardsData?<>
                {
                    this.props.state.cardsData
                    .filter((data)=>{
                      // console.log(data.idList==this.props.listid); 
                      return data.idList==this.props.listid
                    })
                    .map((data,index)=>{
                        return(
                            <>
                            <CardContent key={data.id} onClick={()=>{
                              this.setState({
                                value:data.name,
                                cardId:data.id
                              })
                              }
                              
                              }>
                                <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} sx={{ fontSize: 14,backgroundColor:'white',padding:'5px',borderRadius:'5px',boxShadow:'1px  2px gray' }}  key={data.id}>
                                  <Typography onClick={this.handelOpen}>
                                      {data.name}    
                                  </Typography>
                                  <DeleteOutlineRoundedIcon onClick={()=>{this.props.deleteCardsData(data.id)}}></DeleteOutlineRoundedIcon>
                                </Stack>
                            </CardContent>
                            {
                              index == this.props.state.cardsData.length-1?
                              <Stack>
            
                            <Dialog open={this.state.open} onClose={this.handelClose}>
                            <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} width={'350px'}>
                              <Typography  sx={{textAlign:'center',marginRight:'100px',padding:'10px'}} pt={1}>{this.state.value}</Typography>
                              <CloseRoundedIcon  size='small' sx={{margin:'10px'}}  onClick={this.handelClose}></CloseRoundedIcon>
                            </Stack>
                            <hr></hr>
                            <DialogContent>
                            
                            {/* <TextField
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
                            /> */}
                                <Checklists></Checklists>
                                </DialogContent>
                            </Dialog>
                          </Stack>:null
                            }
                            
                            </>
                        )
                    })
                }
            </>:<></>
        }
        {
                this.state.addacard?
                <>
                 <TextField id="standard-basic" label="Enter Card Name" type={'textarea'} variant="standard" onChange={(event)=>{
                                    this.setState({
                                        name:event.target.value
                                    })
                                    
                                }}
                                value={this.state.name} />
                <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginTop:'8px'}}>
                <Button variant="contained" size='small' onClick={()=>{
                  this.props.createCardData(this.props.listid,this.state.name)
                  this.setState({
                    name:""
                  })
                }}>Add Card</Button>
                <CloseRoundedIcon onClick={this.handleaddClose}></CloseRoundedIcon>
                </div>
                </>
                : <Button variant="text" size='small' onClick={this.handeladdOpen} className='text-secondary'>+ Add a Card</Button>
            }
        
      </Stack>
    )
  }
}


const mapStateToProps = (state) =>{
    return {state: state}
  }
  
  const matchDispatchToProps = {
    gettingCardsData:gettingCardsData,
    createCardData:createCardData,
    deleteCardsData:deleteCardsData
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(Cards)