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
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/service/user";
import { toast } from "react-toastify";

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

  const { mutate: doLogin } = useMutation({
    mutationFn: (params: { username: string; password: string }) =>
      UserService.login(params),
    onSuccess(data, variables, context) {
      setData({
        username: variables.username,
        password: variables.password,
        email: "",
        name: "",
        isLogged: true,
      });
      router.push("/veiculos");
    },
    onError(error, variables, context) {
      toast.warn("Ocorreu um erro ao logar, verifique suas credenciais");
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    doLogin({ username: data.username, password: data.password });
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
