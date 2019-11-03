
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { TasksStatus } from "../task-status.enum";

export class GetTaskFiltertDto {
    @ IsOptional()
    @ IsIn([TasksStatus.DONE, TasksStatus.IN_PROGRESS, TasksStatus.OPEN])
    status: TasksStatus;
    @ IsOptional()
    @ IsNotEmpty()
    search: string;
}
