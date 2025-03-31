"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/store/user";
import Link from "next/link";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  username: z
    .string()
    .refine((value) => !!value, { message: "Digite o usuário" }),
  password: z
    .string()
    .refine((value) => !!value, { message: "Digite a senha" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { setData } = useUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { handleSubmit, register, formState } = form;
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login data:", data);
    // const user: User = {

    // }
    setData({
      username: data.username,
      passsword: data.password,
      email: "test@",
      name: "Lucas",
      isLogged: true,
    });
    router.push("/veiculos");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                id="username"
                type="username"
                {...register("username")}
                placeholder="Usuário"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Senha"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
            <Link
              href="/login/cadastrar"
              className="w-full flex justify-center"
            >
              Cadastrar
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
