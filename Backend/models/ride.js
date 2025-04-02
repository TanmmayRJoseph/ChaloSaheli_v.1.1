import mongoose,{Schema} from "mongoose";

const RideSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Saheli", required: true },
    captain: { type: Schema.Types.ObjectId, ref: "Saarthi", default: null },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    fare: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "completed", "canceled"],
      default: "pending",
    },
    duration: { type: Number }, //in seconds
    distance: { type: Number }, //in meters
    paymentID: { type: String },
    orderID: { type: String },
    // vehicleType: { type: String, required: true },
    otp: { type: String, select: false, required: true,select: false },
  },
  { timestamps: true }
);

const Ride = mongoose.models?.Ride||mongoose.model("Ride", RideSchema);
export default Ride;
