
async function admin(req,res,next)
{
    if(req.user.role != "admin")
    return res.status(403).send("You are not Authorized");
}
module.exports=admin;