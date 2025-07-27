import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const EditBlogModal = ({ open, onClose, blogData, onUpdate }) => {
  const [formData, setFormData] = useState(blogData);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();
     onUpdate(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="flex justify-center">
                <img className="w-full rounded-xl" src={formData.image} alt="" />
            </div>
          <Input
            label="Title"
            name="title"
            value={formData?.title || ""}
            onChange={handleChange}
            required
          />
          <Textarea
            name="content"
            value={formData?.content || ""}
            onChange={handleChange}
            rows={5}
            required
          />
          <Input
            name="publishDate"
            type="date"
            value={formData?.publishDate?.slice(0, 10) || ""}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Update Blog
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlogModal;
