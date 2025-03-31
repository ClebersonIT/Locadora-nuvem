"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/service/user";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  username: z
    .string()
    .refine((value) => !!value, { message: "Digite o usuário" }),
  password: z
    .string()
    .refine((value) => !!value, { message: "Digite a senha" }),
  email: z
    .string()
    .email()
    .refine((value) => !!value, { message: "Digite o email" }),
  name: z.string().refine((value) => !!value, { message: "Digite o nome" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function RegisterUserPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
    },
  });
  const { handleSubmit, register, formState } = form;
  const { errors, isSubmitting } = formState;

  const { mutate: createUser, isPending: creatingUser } = useMutation({
    mutationFn: (params: User) => UserService.create(params),
  });

  const onSubmit = async (data: LoginFormValues) => {
    const { email, name, password, username } = data;
    const user: User = {
      name,
      email,
      passsword: password,
      username,
    };
    createUser(user);
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Cadastrar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                id="name"
                type="name"
                {...register("name")}
                placeholder="Nome"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
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
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting || creatingUser}
            >
              {isSubmitting || creatingUser ? "Cadastrando..." : "Cadastrar"}
            </Button>
            <Link href="/login" className="w-full flex justify-center">
              Cancelar
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
