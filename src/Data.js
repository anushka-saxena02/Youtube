export let API_KEY ='AIzaSyDcBXxdIz67zeUuzuapzCJ5eFqVIAOxvT8'

 export let value_coverter=(value)=>{
    if (value>=1000000){
        return Math.floor(value/1000000)+"M"
    }
    else if(value>=1000)
    {
        return Math.floor(value/1000)+"K"
    }
    else{
        return value;
    }
}