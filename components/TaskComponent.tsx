import { OtherOptions } from "./OtherOptions"
import { Checkbox } from "./ui/checkbox"
import { Separator } from "./ui/separator"

type Item = {
    task: string, 
    id: string, 
    userId: string, 
    isComplete: boolean
}

export default function TaskComponent ({
    task,
    id,
    userId,
    isComplete
}: Item){
    return <form>
        <div className="flex justify-between">
            <div className="flex justify-content-start place-items-center">
                <Checkbox className="m-2"/>
                <input type="text" id={id} value={task} disabled={false} className="bg-white"/>  
            </div>
            <OtherOptions />
        </div>
        <Separator className="mt-2"/>
    </form>
}