export const gethome=async(req,res)=>{
   
    res.status(200).render("home.ejs");
}
export const getsignup=async(req,res)=>{
   
    res.status(200).render("register.ejs",{msg:""});
}
export const getlogin=async(req,res)=>{
   
    res.status(200).render("login.ejs",{message:""});
}

export const logout=async(req,res)=>{
     if(req.session.user){
            req.session.user=undefined;
            req.session.distroy;
     }
    res.status(200).render("home.ejs");
}