import { QueryClient, QueryClientProvider } from "react-query";
import SignInForm from "../components/signInForm.component";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
})

const SignInPage: React.FC = () => {

  return (
    <div className="pt-44">
      <QueryClientProvider client={queryClient}>
        <SignInForm/>
      </QueryClientProvider>
    </div>
  );
};
export default SignInPage;
