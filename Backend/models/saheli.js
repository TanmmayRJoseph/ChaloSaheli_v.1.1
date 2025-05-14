import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const saheliSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    gender: { type: String, required: true },
    emergencyNo: { type: Number, required: true },
    dob: { type: Date, required: true },
    emailId: { type: String, required: true },
    address: { type: String, required: true },
    userType: { type: String, default: "Saheli" },
    password: { type: String, required: true },
    socketId: { type: String , default: "" },
  },
  { timestamps: true }
);

// Hashing the password before saving
saheliSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
//generating token
saheliSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({_id:this._id,emailId:this.emailId,userType: this.userType,},process.env.SECRET_KEY);
  return token
}
//comparing password
saheliSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const Saheli = mongoose.models.Saheli || mongoose.model("Saheli", saheliSchema);

export default Saheli;