import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { USER_STATUS } from '../../../auth/const/userStatus.const';
import { SessionAuthGuard } from '../../../auth/guard/session.guard';
import { TransformInterceptor } from '../../../util/convention-transformer/transformer.interceptor';
import { USER_ROLE } from '../const/userRole';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UserLoginDto } from '../dto/userLogin.dto';
import { UserLoginIdCheckDto } from '../dto/userLoginIdCheck.dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(@Inject() private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입', description: 'id, password를 받아 회원가입 요청을 처리한다.' })
  @ApiBody({
    type: UserCreateDto,
    examples: {
      example: {
        value: {
          login_id: 'test',
          login_password: 'test1234',
        },
      },
    },
  })
  @ApiOkResponse({ description: '회원가입 성공' })
  @ApiConflictResponse({ description: '이미 존재하는 사용자입니다.' })
  @UseInterceptors(TransformInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() createUserDto: UserCreateDto) {
    await this.userService.registerUser(createUserDto);
    return { message: '회원가입이 성공적으로 완료되었습니다.' };
  }

  @ApiOperation({ summary: '회원가입', description: 'id, password를 받아 회원가입 요청을 처리한다.' })
  @ApiBody({
    type: UserCreateDto,
    examples: {
      example: {
        value: {
          login_id: 'test',
          login_password: 'test1234',
        },
      },
    },
  })
  @ApiOkResponse({ description: '회원가입 성공' })
  @ApiConflictResponse({ description: '이미 존재하는 사용자입니다.' })
  @UseInterceptors(TransformInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('signup/admin')
  async signupForAdmin(@Body() createUserDto: UserCreateDto) {
    await this.userService.registerUser(createUserDto, USER_ROLE.ADMIN);
    return { message: '관리자 회원가입이 성공적으로 완료되었습니다.' };
  }

  @ApiOperation({ summary: '로그인', description: 'id, password를 받아 로그인 요청을 처리한다.' })
  @ApiBody({
    type: UserLoginDto,
    examples: {
      example: {
        value: {
          login_id: 'test',
          login_password: 'password',
        },
      },
    },
  })
  @ApiOkResponse({ description: '로그인 성공', example: { login_id: 'test' } })
  @ApiUnauthorizedResponse({ description: '로그인 실패 또는 등록되지 않은 사용자' })
  @UseInterceptors(TransformInterceptor)
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Res({ passthrough: true }) res: Response) {
    const { sessionId, userInfo } = await this.userService.validateUser(
      userLoginDto.loginId,
      userLoginDto.loginPassword,
    );
    res.cookie('SID', sessionId, { httpOnly: true, secure: true });

    return userInfo;
  }

  @ApiOperation({ summary: '아이디 중복 체크', description: 'id 중복 체크 요청을 처리한다.' })
  @ApiBody({
    type: UserLoginIdCheckDto,
    examples: {
      example: {
        value: {
          login_id: 'test',
        },
      },
    },
  })
  @ApiOkResponse({ description: '사용 가능한 id', example: { available: false } })
  @UseInterceptors(TransformInterceptor)
  @Post('checkid')
  async checkInfo(@Body() userLoginIdCheckDto: UserLoginIdCheckDto) {
    return await this.userService.isAvailableLoginId(userLoginIdCheckDto);
  }

  @ApiOperation({ summary: '로그아웃', description: '로그아웃 요청을 처리한다.' })
  @ApiOkResponse({ description: '로그아웃 성공' })
  @ApiForbiddenResponse({ description: '접근 권한이 없습니다.' })
  @UseGuards(SessionAuthGuard(USER_STATUS.LOGIN))
  @Post('logout')
  async getUserLogout(@Req() req: Request) {
    const sid = req.cookies['SID'];
    return await this.userService.logoutUser(sid);
  }

  @ApiOperation({ summary: '사용자 정보', description: '사용자 정보 요청을 처리한다. 사용자 ID를 불러온다.' })
  @ApiOkResponse({ description: '사용자 정보 조회 성공', example: { login_id: 'test' } })
  @ApiInternalServerErrorResponse({ description: '사용자 정보를 불러오는데 실패하였습니다.' })
  @Get()
  @UseGuards(SessionAuthGuard())
  async getUserInfo(@Req() req: Request) {
    return await this.userService.getUserInfo(req.cookies['SID']);
  }
}
