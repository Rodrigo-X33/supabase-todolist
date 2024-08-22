import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
// import { useFormState } from "react-dom";
import { createNewTask, getTasks } from "@/lib/actions";

export default async function ProtectedPage() {
  const supabase = createClient();

  const { data: { user }} = await supabase.auth.getUser();
  const tasks = await getTasks();
  console.log(tasks);

  if (!user) {
    return redirect("/login");
  }

  // const [state, formAction] = useFormState(createNewTask, null);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-medium bg-purple-950 text-white text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <DeployButton />
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-2xl mb-4">Tasks</h2>
          <pre>{JSON.stringify(tasks, null, 2)}</pre>
          <div>
            <form action={createNewTask}>
              <input type="text" name="newTask"/>
              <button type="submit" className="bg-purple-600 p-1 m-1">Send</button>
            </form>
          </div>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
