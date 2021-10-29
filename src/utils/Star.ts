/**
 * 星星类
 * @author Ywq
 * @date 2021/10/31 17:46
 */
export class Star implements Start {
  public ctx: CanvasRenderingContext2D; // canvas画笔对象
  public x = 0; // 横坐标
  public y = 0; // 纵坐标
  public r = 0; // 星星半径,默认为1像素
  public speed_x = 0; // 横向速度
  public speed_y = 0; // 纵向速度

  constructor(ctx: CanvasRenderingContext2D, x = 0, y = 0, r = 0, speed_x = 0, speed_y = 0, ctxConfig: any = {}) {
    const speedX = Math.pow(-1, parseInt(String(Math.random() * 10))) * (Math.random() + 1) * .1;
    const speedY = Math.pow(-1, parseInt(String(Math.random() * 10))) * (Math.random() + 1) * .1;
    const size = Math.random() + .5;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r || size;
    this.speed_x = speed_x || speedX;
    this.speed_y = speed_y || speedY;

    ctx.fillStyle = ctxConfig?.color || "#fff"; // 星星颜色,默认为白色
    ctx.strokeStyle = ctxConfig?.lineColor || "rgba(0, 255, 255, .3)"; // 连线颜色
    ctx.lineWidth = ctxConfig?.lineWidth || .3; // 连线宽度
  }

  /**
   * 用于星星的初始化
   */
  render(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  /**
   * 用于星星的移动
   */
  move(): void {
    this.check();
    this.x -= this.speed_x;
    this.y -= this.speed_y;
  }

  /**
   * 用于检测星星是否移动到画布边缘
   * 如果到达边缘,反向移动
   */
  check(): void {
    if (this.x <= 0 || this.x >= this.ctx.canvas.width) {
      this.speed_x = -this.speed_x;
    } else if (this.y <= 0 || this.y >= this.ctx.canvas.height) {
      this.speed_y = -this.speed_y;
    }
  }
}

export interface Start {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
  speed_x: number;
  speed_y: number;

  render(): void;

  move(): void;

  check(): void;
}
