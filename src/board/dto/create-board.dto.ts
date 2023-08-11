import { IsNotEmpty } from "class-validator";

export class CreateBaordDto{
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    description : string;
}