import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
const key = '44fd76c8a8185b925892a08c3b91d28e';
const token = 'ATTA914c18ff4bc110c847eb2b7c989dc10c7b4e8e05d28f8845fbfe1c48bce469fc6C1771EC';

const initailasatate = {
    boardsData : [],
    listsData : [],
    cardsData : [],
    checkListData:[],
    checkItemsData:[],
    archivedata:[]
}

function readingBoardsData(data){
    return{
        type : 'READING_BOARDS_DATA',
        payload : data
    }
}
function creatingBoardsData(data){
    return{
        type : 'CREATING_BOARDS_DATA',
        payload : data
    }
}
function readingListsData(data){
    return{
        type : 'READING_LISTS_DATA',
        payload : data
    }
}
function creatingListsData(data){
    return{
        type : 'CREATING_LISTS_DATA',
        payload : data
    }
}
function deleteListsData(data){
    return{
        type : 'DELETE_LISTS_DATA',
        payload : data
    }
}
function readingCardssData(data){
    return{
        type : 'READING_CARDS_DATA',
        payload : data
    }
} 
function creatingCardsData(data){
    return{
        type : 'CREATING_CARDS_DATA',
        payload : data
    }
} 
function deletingCardsData(data){
    return{
        type : 'DELETING_CARDS_DATA',
        payload : data
    }
}
function readingCheckListData(data){
    return{
        type : 'READING_CHECKLIST_DATA',
        payload : data
    }
}
function creatingCheckListData(data){
    return{
        type : 'CREATING_CHECKLIST_DATA',
        payload : data
    }
} 
function deletingChechListData(data){
    return{
        type : 'DELETING_CHECKLIST_DATA',
        payload : data
    }
}
function readingCheckItemData(data){
    return{
        type : 'READING_CHECKITEMS_DATA',
        payload : data
    }
}
function creatingCheckItemData(data){
    return{
        type : 'CREATING_CHECKITEMS_DATA',
        payload : data
    }
}
function deleteCheckItemData(data){
    return{
        type : 'DELETE_CHECKITEMS_DATA',
        payload : data
    }
}

export function gettingBoardsData(){
    return function(dispatch){
        dispatch(readingBoardsData(null))
        axios.get(`https://api.trello.com/1/members/me/boards?key=44fd76c8a8185b925892a08c3b91d28e&token=ATTA914c18ff4bc110c847eb2b7c989dc10c7b4e8e05d28f8845fbfe1c48bce469fc6C1771EC`)
        .then((res)=>{
            // console.log(res.data,'get')
            dispatch(readingBoardsData(res.data))
        })
        
    }
}
export function creatBoardsData(name){
    return function(dispatch){
        axios.post(`https://api.trello.com/1/boards/?name=${name}&key=44fd76c8a8185b925892a08c3b91d28e&token=ATTA914c18ff4bc110c847eb2b7c989dc10c7b4e8e05d28f8845fbfe1c48bce469fc6C1771EC`)
        .then(res =>{ 
            dispatch(creatingBoardsData(res.data))
            // console.log( res.data,'post');  
        })
    }
}
export function gettingListsData(id){
    return function(dispatch){
        axios.get(`https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`)
        .then((res)=>{
        dispatch(readingListsData(res.data))
        })
    }
}
export function createListData(name,id){
    return function(dispatch){
        axios.post(`https://api.trello.com/1/lists?name=${name}&idBoard=${id}&key=${key}&token=${token}`)
        .then(res =>{ 
            dispatch(creatingListsData(res.data))
            // console.log( res.data,'post');  
        })
    }
}
export function deleteListData(id){
    return function(dispatch){
        axios.put(`https://api.trello.com/1/lists/${id}/closed?value=true&key=${key}&token=${token}`)
        .then((res)=>{
            dispatch(deleteListsData(res.data.id))
        })
    }
}
export function gettingCardsData(id){
    return function(dispatch){
        axios.get(`https://api.trello.com/1/lists/${id}/cards?key=${key}&token=${token}`)
        .then((res)=>{
        dispatch(readingCardssData(res.data))
        // console.log('hello');
        })
    }
}
export function createCardData(id,name){
    return function(dispatch){
        axios.post(`https://api.trello.com/1/cards?idList=${id}&name=${name}&key=${key}&token=${token}`)
        .then(res =>{ 
            dispatch(creatingCardsData(res.data))
            // console.log( res.data,'post');  
        })
    }
}
export function deleteCardsData(id){
    return function(dispatch){
        axios.delete(`https://api.trello.com/1/cards/${id}?key=${key}&token=${token}`)
        .then((res)=>{
            dispatch(deletingCardsData(id))
            // console.log(res.data);
        })
    }
}
export function gettingCheckListData(id){
    return function(dispatch){
        dispatch(readingCheckListData(null))
        axios.get(`https://api.trello.com/1/cards/${id}/checklists?key=${key}&token=${token}`)
        .then((res)=>{
            dispatch(readingCheckListData(res.data))
        })
        
    }
}
export function createChechListData(name,id){
    return function(dispatch){
        axios.post(`https://api.trello.com/1/checklists?name=${name}&idCard=${id}&key=${key}&token=${token}`)
        .then(res =>{ 
            dispatch(creatingCheckListData(res.data))
            // console.log( res.data,'post');  
        })
    }
}
export function deleteCheckListData(id){
    return function(dispatch){
        axios.delete(`https://api.trello.com/1/checklists/${id}?key=${key}&token=${token}`)
        .then((res)=>{
            dispatch(deletingChechListData(id))
            // console.log(res.data);
        })
    }
}
export function readingCheckItemsData(id){
    return function(dispatch){
        axios.get(`https://api.trello.com/1/checklists/${id}/checkItems?key=${key}&token=${token}`)
        .then((res)=>{
            dispatch(readingCheckItemData(res.data))
        })
    }
}
export function createChechItemData(id,name){
    return function(dispatch){
        axios .post(`https://api.trello.com/1/checklists/${id}/checkItems?name=${name}&key=${key}&token=${token}`)
        .then(res =>{ 
            dispatch(creatingCheckItemData(res.data))
            // console.log( res.data,'post');  
        })
    }
}
export function deleteCheckItemsData(checkListId,checkItemId){
    return function(dispatch){
        axios.delete(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${key}&token=${token}`)
        .then((res)=>{
            dispatch(deleteCheckItemData(checkListId))
            // console.log(res.data);
        })
    }
}

function reducer(state,action){
    switch(action.type){
        case 'READING_BOARDS_DATA':
            return{
                ...state,
                boardsData:action.payload
            }
        case 'CREATING_BOARDS_DATA':
            return{
                ...state,
                boardsData:[
                    ...state.boardsData,
                    action.payload
                ]
            }
        case 'READING_LISTS_DATA':
            return{
                ...state,
                listsData:action.payload
            }
        case 'CREATING_LISTS_DATA':
            return{
                ...state,
                listsData:[
                    ...state.listsData,
                    action.payload
                ]
            }
        case 'DELETE_LISTS_DATA':
            let filteredData = state.listsData.filter((data)=>{
                if(data.id !== action.payload){
                    return data
                }
            })
            return{
                ...state,
                listsData:[
                    ...filteredData
                ]
            }
        case 'READING_CARDS_DATA':
            return{
                ...state,
                cardsData:[
                    ...state.cardsData,
                    ...action.payload
                ]
            }
        case 'CREATING_CARDS_DATA':
            return{
                ...state,
                cardsData:[
                    ...state.cardsData,
                    action.payload
                ]
            }
        case 'DELETING_CARDS_DATA':
                let filteredcardData = state.cardsData.filter((data)=>{
                    return data.id !== action.payload
                })
                return{
                    ...state,
                    cardsData:[
                        ...filteredcardData
                    ]
                }
        case 'READING_CHECKLIST_DATA':
            return{
                ...state,
                checkListData:action.payload
            }
        case 'CREATING_CHECKLIST_DATA':
            return{
                ...state,
                checkListData:[
                    ...state.checkListData,
                    action.payload
                ]
            }
        case 'DELETING_CHECKLIST_DATA':
            let filteredchecklistData = state.checkListData.filter((data)=>{
                return data.id !== action.payload
            })
            return{
                ...state,
                checkListData:[
                    ...filteredchecklistData
                ]
            }
        case 'READING_CHECKITEMS_DATA':
            return{
                ...state,
                checkItemsData:[
                    ...state.checkItemsData,
                    ...action.payload]
            }
        case 'CREATING_CHECKITEMS_DATA':
            return{
                ...state,
                checkItemsData:[
                    ...state.checkItemsData,
                    action.payload
                ]
            }
        case 'DELETE_CHECKITEMS_DATA':
            const newChekItems = state.checkItemsData.filter((data) => {
                return data.id !== action.payload;
            })
            return{
                ...state,
                checkItemsData:[
                    ...newChekItems
                ]
            }
        default:
            return state 
    }
}

const store = createStore(reducer,
    // window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION(),
    initailasatate,applyMiddleware(thunk))
store.subscribe(()=>{
    console.log(store.getState());
})
export default store