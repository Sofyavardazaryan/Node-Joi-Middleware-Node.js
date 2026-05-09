class AuthController{
   async register (req, res, next){
    const { users, validateBody } = res.locals;
      const user = users.find(u => u.email === validateBody.email);
      if (!user) {
        return res.send("Wrong email or password");
      }
    
      const isValid = await bcrypt.compare(
        validateBody.password,
        user.password
      );
    
      if (!isValid) {
        return res.send("Wrong email or password");
      }
      res.redirect("/");
   }
   
}

module.exports = AuthController