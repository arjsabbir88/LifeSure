import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";
import { useQuery } from '@tanstack/react-query'

const statusColor = {
  Approved: "bg-green-500",
  Pending: "bg-yellow-500",
  Rejected: "bg-red-500",
};

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const myPolicy = ({ policies, onReview, onView }) => {

    const {user} = useContext(AuthContext);

    const axiosSecure = useAxiosSecure()

    const {isPanding, data: myPolicy =[]} = useQuery({
        queryKey: ['my-policy', user?.email],
        enabled: !!user?.email,
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/my-policy?email=${user?.email}`)
            return res.data;
        }
    })

    // console.log(data)


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={tableVariants}
      className="overflow-x-auto rounded-xl border shadow-sm bg-white"
    >
      <table className="w-full text-sm text-left table-auto border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase font-medium">
          <tr>
            <th className="px-4 py-3">Policy Name</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Premium</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {myPolicy.map((policy) => (
              <motion.tr
                key={myPolicy._id}
                variants={rowVariants}
                exit={{ opacity: 0, y: -10 }}
                className="hover:bg-gray-50 border-b transition"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {policy.policyDetails.policyTitle}
                </td>
                <td className="px-4 py-3">
                  <Badge className={`${statusColor[policy.status]} text-white`}>
                    {policy.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">{policy?.convertedData?.duration} years</td>
                <td className="px-4 py-3">${policy.policyDetails?.basePremium }</td>
                <td className="px-4 py-3 flex gap-2 justify-end">
                  <Button size="sm" onClick={() => onView(policy)}>
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onReview(policy)}
                  >
                    Review
                  </Button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence> 
        </tbody>
      </table>
    </motion.div>
  );
};

export default myPolicy;
