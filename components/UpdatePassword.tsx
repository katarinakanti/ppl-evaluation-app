"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "./ui/use-toast";

export function UpdatePassword() {
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();

  //   const handleSubmit = async () => {
  //     const { data, error } = await supabase.auth.updateUser({
  //       password: password,
  //     });
  //     toast({ title: "Password berhasil diubah" });
  //     if (error) {
  //       toast({ title: "Gagal mengubah password", description: error.message });
  //       return;
  //     }
  //   };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const { data, error } = await supabase.auth.updateUser({
      password: formData.get("password") as string,
    });
    toast({ title: "Password berhasil diubah" });
    if (error) {
      toast({ title: "Gagal mengubah password", description: error.message });
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ubah Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Ubah Password</DialogTitle>
            <DialogDescription>
              Ubah password anda dengan password baru.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                name="password"
                id="password"
                type="password"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
