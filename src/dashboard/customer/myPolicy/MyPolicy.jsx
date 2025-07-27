import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loader from "@/components/Custom/loader/Loader";
import ApprovedPolicyDownload from "@/pages/policyPdf/ApprovedPolicyDownload";

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

const MyPolicy = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const { isPanding, data: myPolicy = [] } = useQuery({
    queryKey: ["my-policy", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-policy?email=${user?.email}`);
      return res.data;
    },
  });
 
  if (isPanding) {
    return <Loader></Loader>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={tableVariants}
      className="overflow-x-auto"
    >
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold text-green-950">Policies</h1>
        <p className="text-gray-400">
          Manage and organize all your insurance plans in one place.
        </p>
      </div>
      <table className="max-w-6xl mx-auto w-full text-sm text-left table-auto border-collapse rounded-xl outline-2 bg-white shadow-xl">
        <thead className="bg-green-300 text-gray-700 uppercase font-medium">
          <tr>
            <th className="px-4 py-3">Policy Name</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Reject FeedBack</th>
            <th className="px-4 py-3">Premium</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {myPolicy.map((policy, index) => (
              <motion.tr
                key={index}
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
                <td className="px-4 py-3">
                  {policy?.convertedData?.duration} years
                </td>
                <td>
                  {policy?.status?.toLowerCase() === "rejected" && (
                    <span>{policy?.adminFeedback}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  ${policy.policyDetails?.basePremium} Monthly
                </td>
                <td className="px-4 py-3 flex gap-2 justify-end">
                  <Link
                    to={`/policiesDetails/${policy.bookingPolicyId}`}
                    size="sm"
                    className="btn btn-soft btn-success bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 text-white hover:text-black"
                  >
                    View details
                  </Link>
                  <Link
                    to="/dashboard/review"
                    size="sm"
                    variant="outline"
                    className="btn btn-soft btn-success bg-gradient-to-r hover:from-green-400 hover:to-green-600 text-black hover:text-white"
                  >
                    Review
                  </Link>
                  {policy?.status?.toLowerCase() === "active" && <ApprovedPolicyDownload policy={policy} />}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </motion.div>
  );
};

export default MyPolicy;
