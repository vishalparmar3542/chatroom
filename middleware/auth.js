
export const auth=(req,res,next)=>{
    console.log(req.session);
    console.log(req.sessionID);
    if(req.session.user){
        console.log("authenticated");
        next();
    }else{
        res.redirect('/');
    }
}


export const logauth=(req,res,next)=>{
    console.log(req.session);
    console.log(req.sessionID);
    if(req.session.user){
        console.log("authenticated alredy");
        res.redirect("/chatroom");
        
    }else{
        next();
    }
}