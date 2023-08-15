import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
import { CreateBaordDto } from './dto/create-board.dto';
import {BoardRepository} from  './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {Board} from './board.entity'

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}

    private boards : Board[] = [];

    GetAllBoards(): Board[]{
        return this.boards;
    }

    async CreateBoard(createBoardDto : CreateBaordDto):Promise<Board>{
        const {title, description} = createBoardDto;
        
        const board = this.boardRepository.create({
            //id : uuid(),
            title : title,
            description : description,
            status : BoardStatus.PUBLIC,
        })

        await this.boardRepository.save(board);
        return board;
    }

   async GetBoardById(id : string): Promise <Board>{
        const found = await this.boardRepository.findOne(id)

        if(!found){
            throw new NotFoundException(`${id} 를 찾을 수 없습니다.`);
        }

        return found
    }

    DeleteBoardById(id : string):void{
        //게시물 유무 체크
        const found = this.GetBoardById(id);
        //filter => id가 같지 않은것만 남김고 삭제
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    UpdateBoardStatus(id : string, status: BoardStatus):Board{
        const board = this.GetBoardById(id);
        board.status = status;
        return board;
    }
}
