import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { ReactNode } from "react";

interface ModalCustomProps {
  title?: string;
  description?: string;
  content: ReactNode;
  btn: ReactNode;
  isMenuItem?: boolean;
}

const ModalCustom = ({
  title,
  description,
  content,
  btn,
}: ModalCustomProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        {title && <DialogTitle>{title}</DialogTitle>}
        {description && <DialogDescription>{description}</DialogDescription>}
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default ModalCustom;
