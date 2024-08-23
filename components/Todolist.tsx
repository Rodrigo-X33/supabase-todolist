import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createNewTask, getTasks } from "@/lib/actions"
import TaskComponent from "./TaskComponent";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";


export default async function Todolist() {
    const tasks = await getTasks();
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>¡Es hora de empezar el día!</CardTitle>
        <CardDescription>Comienza tu día de forma productiva</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid w-full items-center gap-4">
                {tasks?.map((item)=>{
                    return <TaskComponent
                    task={item.task} 
                    id={item.id} 
                    userId={item.user_id} 
                    isComplete={item.is_complete}/>
                })}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <form className="w-full flex" action={createNewTask}>
          <Input type="text" placeholder="Añade una tarea" name="newTask" />
          <Button className="ml-2" type="submit">
            <Plus />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}


