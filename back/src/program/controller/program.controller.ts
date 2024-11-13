import { Controller, Get, InternalServerErrorException, NotFoundException, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProgramService } from '../service/program.service';
import { ProgramMainPageDto } from '../dto/programMainPageDto';
import { ProgramIdDto } from '../dto/programIdDto';
import { ProgramSpecificDto } from '../dto/programSpecificDto';

@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Get()
  async findAllProgram() {
    try {
      const programs: ProgramMainPageDto[] = await this.programService.findMainPageProgramData();
      return programs;
    } catch (error) {
      throw new InternalServerErrorException('서버 오류 발생');
    }
  }

  @Get(':programId')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async findOneProgram(@Param() programIdDto: ProgramIdDto) {
    try {
      const program: ProgramSpecificDto = await this.programService.findSpecificProgram(programIdDto);
      return program;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('서버 오류 발생');
    }
  }
}
