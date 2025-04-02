import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const saarthiSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    gender: { type: String, required: true },
    vechile: { type: String, required: true },
    dob: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    password: { type: String, required: true },
    userType:{type:String,default:"Saarthi"},
    socketId: { type: String, default: "" },
    location:{
      ltd:{
        type:Number,
      },
      lng:{
        type:Number,
      }
    }
  },
  { timestamps: true }
);

//hasing the password before saving
saarthiSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//comparing password
saarthiSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//generating token
saarthiSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({_id:this._id,emailId:this.emailId,name:this.name,phoneNo:this.phoneNo,vechile:this.vechile},process.env.SECRET_KEY);
  return token
}


const Saarthi = mongoose.models.Saarthi || mongoose.model("Saarthi", saarthiSchema);
export default Saarthi;