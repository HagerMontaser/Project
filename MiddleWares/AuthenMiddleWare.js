//require json web token
const jwt=require("jsonwebtoken");

module.exports=(request,response,next)=>{
    let token,decodedToken;
    try{ // 34an lw mafe4 token 7ytrma exception
        //token 7ykon mab3ot fel header of request 2le gay lel server.
       token=request.get("Authorization").split(" ")[1]; //fe 3ndk header mab3ot esmo authorization l2n f3lyn ana fel front end 7b3t el token f header esmo authorization.
       decodedToken= jwt.verify(token,"HagerMontaser5"); //decryption
      
    }
    catch(error)
    {
        next(new Error("Not Authenticated"));
    }

//user is authenticated
    request.Role = decodedToken.Role;
    
    next();
}