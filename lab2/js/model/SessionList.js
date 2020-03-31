import Timer from "./Timer.js"
export default class SessionList{
    constructor(){
        this.list = [];
        this.onChangeCallback = null;

    }
    readFromJson = path =>{
        this.list = JSON.parse(localStorage.getItem(path));
        //console.log(this.list);
    }
    delete(itemId){
            const itemIndex = this.list.findIndex( (item) => list.id === itemId); 
            this.items.splice(itemIndex, 1);
    }
    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }
}