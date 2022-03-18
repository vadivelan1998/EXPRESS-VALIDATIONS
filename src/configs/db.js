const mongoose =require("mongoose")

module.exports=() =>{
    return mongoose.connect(
      "mongodb+srv://vadivelan1998:vadivelan1234@cluster0.jcl73.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
}
// const mongoose = require("mongoose");

// module.exports = () => {
//   return mongoose.connect(
//     "mongodb+srv://vadivelan1998:vadivelan1234@cluster0.35gfm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//   );
// };