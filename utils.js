const debounce =(func,delay = 1500) =>{
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
           func.apply(null, args); 
        //    console.log("demo 2",dem2)   ;
            },delay);
    };
    };