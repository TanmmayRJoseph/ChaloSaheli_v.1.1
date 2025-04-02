// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import axios from "axios";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";

// export default function SignUpPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     gender: "",
//     dob: "",
//     city: "",
//     phoneNo: "",
//     vechile: "",
//     emailId: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   //*previous route handler
//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   try {
//   //     setLoading(true);
//   //     const response = await axios.post("/api/saarthi/register", form);
//   //     console.log(response.data);
//   //     toast.success("Registration successful!");
//   //     router.push("/login-as-Saarthi");
//   //   } catch (error) {
//   //     toast.dismiss();
//   //     toast.error(`Registration failed: ${error || "Something went wrong"}`);
//   //     console.error("Registration failed", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await axios.post("http://localhost:5000/saarthi/register", form);
//       console.log(response.data);
//       toast.success("Registration successful!");
//       router.push("/login-as-Saarthi");
//     } catch (error) {
//       toast.dismiss();
//       toast.error(`Registration failed: ${error || "Something went wrong"}`);
//       console.error("Registration failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 relative">
//       {/* Logo at the Top Right */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.5 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//         className="absolute top-5 right-5"
//       >
//         <Image
//           src="/image/ChaloSaheliLogo.png"
//           alt="Logo"
//           width={100}
//           height={100}
//         />
//       </motion.div>

//       {/* Heading */}
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-pink-700 text-3xl font-bold text-center pb-14"
//       >
//         New to Chalo Saheli? <br /> Sign up Saarthi!
//       </motion.h2>

//       {/* Sign-up Form Container */}
//       <form
//         onSubmit={handleSubmit}
//         className=" w-full max-w-5xl bg-pink-200 p-10 rounded-lg shadow-lg flex items-center"
//       >
//         {/* Grid Layout for Three Sections */}
//         <div className="grid grid-cols-3 h-96 w-full gap-4 items-center">
//           {/* Left Column: Input Fields */}
//           <div className="flex flex-col space-y-6">
//             {["name", "gender", "dob", "city"].map((field, index) => (
//               <motion.input
//                 key={index}
//                 name={field}
//                 value={form[field as keyof typeof form]}
//                 onChange={handleChange}
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: index * 0.1 }}
//                 type="text"
//                 placeholder={field.replace(/([A-Z])/g, " $1").trim()}
//                 className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
//               />
//             ))}
//           </div>

//           {/* Middle Column: Girl Illustration */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             className="flex justify-center items-center"
//           >
//             <Image
//               src="/image/girl.png"
//               alt="Girl Illustration"
//               width={180}
//               height={180}
//             />
//           </motion.div>

//           {/* Right Column: Input Fields */}
//           <div className="flex flex-col space-y-6">
//             {["phoneNo", "vechile", "emailId", "password"].map(
//               (field, index) => (
//                 <motion.input
//                   key={index}
//                   name={field}
//                   value={form[field as keyof typeof form]}
//                   onChange={handleChange}
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.8, delay: index * 0.1 }}
//                   type={field === "password" ? "password" : "text"}
//                   placeholder={field.replace(/([A-Z])/g, " $1").trim()}
//                   className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               )
//             )}
//           </div>
//         </div>

//         {/* Submit Button Below the Form */}
//         <motion.button
//           type="submit"
//           whileHover={{ scale: 1.1 }}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.8 }}
//           className="mt-8 px-8 py-3 bg-pink-500 text-white text-xl font-bold rounded-full hover:bg-pink-600 transition-all"
//         >
//           {loading ? "Loading..." : "Sign Up"}
//         </motion.button>
//       </form>
//     </div>
//   );
// }




"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    city: "",
    phoneNo: "",
    vechile: "",
    emailId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/saarthi/register", form);
      console.log(response.data);
      toast.success("Registration successful!");
      router.push("/login-as-Saarthi");
    } catch (error) {
      toast.dismiss();
      toast.error(`Registration failed: ${error || "Something went wrong"}`);
      console.error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 relative">
      {/* Logo at the Top Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-5 right-5"
      >
        <Image
          src="/image/ChaloSaheliLogo.png"
          alt="Logo"
          width={100}
          height={100}
        />
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-pink-700 text-4xl font-bold text-center pb-14"
      >
        New to Chalo Saheli? <br /> Sign up Saarthi!
      </motion.h2>

      {/* Sign-up Form Container */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-pink-200 p-10 rounded-lg shadow-lg flex flex-col items-center"
      >
        {/* Grid Layout for Three Sections */}
        <div className="grid grid-cols-3  w-full gap-4 items-center">
          {/* Left Column: Input Fields */}
          <div className="flex flex-col space-y-6">
            {["name", "gender", "dob", "city"].map((field, index) => (
              <motion.input
                key={index}
                name={field}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                type="text"
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            ))}
          </div>

          {/* Middle Column: Girl Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center items-center"
          >
            <Image
              src="/image/girl.png"
              alt="Girl Illustration"
              width={250}
              height={250}
            />
          </motion.div>

          {/* Right Column: Input Fields */}
          <div className="flex flex-col space-y-6">
            {["phoneNo", "vechile", "emailId", "password"].map(
              (field, index) => (
                <motion.input
                  key={index}
                  name={field}
                  value={form[field as keyof typeof form]}
                  onChange={handleChange}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  type={field === "password" ? "password" : "text"}
                  placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                  className="px-4 py-3 bg-pink-100 text-pink-700 text-lg font-medium border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              )
            )}
          </div>
        </div>

        {/* Submit Button Below the Grid */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 px-8 py-3 bg-pink-500 text-white text-3xl font-bold rounded-full hover:bg-pink-600 transition-all"
        >
          {loading ? "Loading..." : "Sign Up"}
        </motion.button>
      </form>
    </div>
  );
}
