import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class AuthenticationCodeService {
  // 用于保存验证码
  public code: string;
  // 存放验证码的过期时间
  public deadline: number;
  constructor() {
    this.code = '';
  }
  // 生成指定长度的随机数字
  createCode(count: number): string {
    this.code = '';
    // 10分钟内有效
    this.deadline = Date.now() + 60 * 10 * 1000;
    for (let i = 0; i < count; i++) {
      // 请补上相关的代码
      const c = (Math.random() * 9);
      this.code += Math.round(c) + '';
    }
    return this.code;
  }
  test()
  {
    console.log(1);
  }
  // 验证用户输入的短信验证码是否一致，是否过期
  validate(value: string): boolean {
    const now = Date.now();
    // return value === this.code && now < this.deadline;
    return value == this.code;
  }
}
