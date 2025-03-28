import { SentimentVeryDissatisfied } from "@mui/icons-material";

export const HandleError = ({ message }: { message: string }) => {
  return (
    <div className="bg-red-400 rounded-md text-center h-max w-full p-4">
      <SentimentVeryDissatisfied fontSize="large" />
      <h1>Perdão Ocorreu um erro</h1>
      <p>{message}</p>
    </div>
  );
};
