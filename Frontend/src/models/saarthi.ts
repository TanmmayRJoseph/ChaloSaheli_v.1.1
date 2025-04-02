import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface ISaarthi {
  name: string;
  phoneNo: string;
  gender: string;
  vechile: string;
  dob: string;
  emailId: string;
  city: string;
  password: string;
  userType:string;
  socketId?: string;
  location?: {
    ltd: number;
    lng: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const saarthiSchema = new mongoose.Schema<ISaarthi>(
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
    socketId: { type: String ,default: ""},
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

// Hash the password before saving
saarthiSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Avoid double-hashing the password
    if (!this.password.startsWith("$2b$")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  next();
});

// Add a method to compare passwords
saarthiSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Saarthi = models?.Saarthi || model("Saarthi", saarthiSchema);
export default Saarthi;
