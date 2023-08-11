import { Controller,Get,Post,Delete,Patch,Body,Param,UsePipes,ValidationPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board, BoardStatus } from './board.model';
import { CreateBaordDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
    constructor(private boardService : BoardService){}

    @Get('/')
    GetAllBoards(): Board[]{
        return this.boardService.GetAllBoards()
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto : CreateBaordDto
        ): Board{
        console.log(createBoardDto)
        return this.boardService.CreateBoard(createBoardDto);
    }

    @Get('/:id')
    GetBoardById(@Param('id') id : string) : Board{
        return this.boardService.GetBoardById(id);
    }

    @Delete('/:id')
    DeleteBoardById(@Param('id') id :string) :void{
        this.boardService.DeleteBoardById(id);
    }

    @Patch('/:id/status')
    UpdateBoardStatus(@Param('id') id : string,@Body('status') status : BoardStatus) : Board{
        return this.UpdateBoardStatus(id,status)
    }
}
