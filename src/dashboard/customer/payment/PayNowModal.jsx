import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaymentCard from "./PaymentCard";

export default function PayNowModal({ open, onClose, onConfirm, policy,refetch}) {

    // console.log(policy)
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
            <img src={policy?.policyDetails?.imageUrl} alt="policy img" />
          <p><strong>Policy:</strong> {policy?.policyDetails?.policyTitle}</p>
          <p><strong>Amount:</strong> ${policy?.estimatedPremiumMonthly}</p>
          <p><strong>Status:</strong> {policy?.paymentStatus}</p>
        </div>
        <div>
            <PaymentCard policy={policy} refetch={refetch}></PaymentCard>
        </div>
        {/* <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} className="bg-green-600 hover:bg-green-700">
            Confirm & Pay
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
