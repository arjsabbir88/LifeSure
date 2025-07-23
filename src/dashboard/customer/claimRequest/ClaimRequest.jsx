import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/authProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import lottiAnimation from '../claimRequest/lottiAnimation'
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { FileText, FileUp, Send } from "lucide-react";
import Loader from "@/components/Custom/loader/Loader";
import { toast } from "sonner";

function ClaimRequest() {

  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [reason, setReason] = useState("");
  const [document, setDocument] = useState(null);

    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext);
    console.log(user)

    const {isPanding, data: claimPolicy=[]} = useQuery({
        queryKey: ['my-policy', user?.email],
        enabled: !!user?.email,
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/claim-request?email=${user?.email}`)
            return res.data;
        }
    })


    if(isPanding){
        return <Loader></Loader>
    }

const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      policyId: selectedPolicy,
      reason,
      document,
      status: "Pending",
    };

    console.log("📨 Submitted Claim Request:", formData);
    // You can use axiosSecure.post('/claim-submit', formData) here

    axiosSecure.post('/policy-claim-request', formData)
    .then((res)=>{
      console.log(res.data)
      if(res.data.insertedId){
        toast.success('Claim Request Sended Successfully!!')
        setReason('');
        setSelectedPolicy('')
      }
    }).catch(err=>{
      console.log(err);
      toast.error(err.message);
    })
  };


  return (
     <div className="max-w-6xl mx-auto flex justify-center items-center h-[100vh]">
        <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 p-6 rounded-xl shadow-xl bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animation */}
      <div className="max-w-sm mx-auto">
        <Lottie animationData={lottiAnimation} loop={true} />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner"
      >
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FileText size={24} /> Claim Request Form
        </h2>

        {/* Dropdown for policy title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select Policy
          </label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={selectedPolicy}
            onChange={(e) => setSelectedPolicy(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Select your policy --
            </option>
            {claimPolicy.map((item) => (
              <option key={item._id} value={item._id}>
                {item.policyDetails?.policyTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Reason */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Reason for Claim
          </label>
          <textarea
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        {/* Upload */}
        <div>
          <label className="mb-1 text-sm font-medium text-gray-700 flex gap-2 items-center">
            <FileUp size={20} /> Upload Document (optional)
          </label>
          <input
            type="file"
            onChange={(e) => setDocument(e.target.files[0])}
            className="w-full border border-dashed border-gray-400 p-2 rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
        >
          <Send size={18} />
          Submit Claim
        </button>
      </form>
    </motion.div>
     </div>
  );
}

export default ClaimRequest;
