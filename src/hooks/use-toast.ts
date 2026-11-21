import { toast as notify } from "sonner";
import type { ReactNode } from "react";
type ToastOptions = { title?: ReactNode; description?: ReactNode; variant?: "destructive" | "default"; duration?: number };
function toast(options: ToastOptions) {
 const title = typeof options.title === "string" ? options.title : "Notificação";
 const description = typeof options.description === "string" ? options.description : undefined;
 const id = options.variant === "destructive" ? notify.error(title, { description, duration: options.duration }) : notify(title, { description, duration: options.duration });
 return { id: String(id), dismiss: () => notify.dismiss(id), update: (_options: ToastOptions) => {} };
}
function useToast() { return { toast, dismiss: (id?: string) => notify.dismiss(id) }; }
export { toast, useToast };
