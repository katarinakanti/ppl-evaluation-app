import { useToast } from "./use-toast";

interface ToastMessage {
  title: string;
  description: string;
}

interface ToastTriggerProps {
  message: ToastMessage;
  onTrigger: () => void;
  className?: string;
  children: React.ReactNode;
}

export const ToastTrigger: React.FC<ToastTriggerProps> = ({
  message,
  onTrigger,
  className,
  children,
}) => {
  const { toast } = useToast();

  return (
    <button
      className={className}
      onClick={() => {
        onTrigger();
        toast(message);
      }}
    >
      {children}
    </button>
  );
};
