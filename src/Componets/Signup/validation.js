export  function validation(arr,obj,setErrmsg) {
    const err=[{},{}]
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let flag=true
    if(arr[0]==1){
        if(obj.email==''){
            err[0]={}
            err[0].type='err'
            err[0].msg='This field is required'
            flag=false
        }else if(!emailRegex.test(obj.email)){
            err[0]={}
            err[0].type='err'
            err[0].msg='Enter email format'
            flag=false
        }else{
            err[0]={}
        }
    }
        if(arr[1]==2){
        if(obj.password==''){
            err[1]={}
            err[1].type='err'
            err[1].msg='This field is required'
            flag=false
        }else if(obj.password.length<8){
            err[1]={}
            err[1].type='err'
            err[1].msg='Must have be 8 character'
            flag=false
        }else{
            err[1]={}
        }
    }
    setErrmsg(err)
    return flag
}