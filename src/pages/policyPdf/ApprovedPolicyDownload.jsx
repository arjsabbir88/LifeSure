import { PDFDownloadLink } from "@react-pdf/renderer";
import PolicyPDF from "./PolicyPDF";
import { Newspaper } from "lucide-react";

export default function ApprovedPolicyDownload({ policy }) {
  return (
    <div>
      <PDFDownloadLink
        document={<PolicyPDF policy={policy} />}
         fileName={`${policy?.policyDetails?.policyTitle.replace(/\s/g, "_")}_policy.pdf`}
      >
        {({ loading }) =>
          loading ? "Generating PDF..." : (
            <button className="bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center justify-center">
              <Newspaper />
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}
