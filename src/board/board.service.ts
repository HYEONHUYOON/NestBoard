import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
import { CreateBaordDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
    private boards : Board[] = [];

    GetAllBoards(): Board[]{
        return this.boards;
    }

    CreateBoard(createBoardDto : CreateBaordDto){
        const {title, description} = createBoardDto;

        const board : Board = {
            id : uuid(),
            title : title,
            description : description,
            status : BoardStatus.PUBLIC,
        }

        this.boards.push(board);
        return board;
    }

    GetBoardById(id : string): Board{
        return this.boards.find((board) => board.id === id);
    }

    DeleteBoardById(id : string):void{
        //filter => id가 같지 않은것만 남김고 삭제
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    UpdateBoardStatus(id : string, status: BoardStatus):Board{
        const board = this.GetBoardById(id);
        board.status = status;
        return board;
    }
}
