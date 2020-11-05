import { OriginEnum, ScreenSizeEnum } from '../service/common';
import { HostListener } from "@angular/core";

export class TemplateComponent{
    public isLoremIpsumData: boolean = true; //CAMBIAR

    public STACK_OVERFLOW = OriginEnum.STACK_OVERFLOW;
    public NET = OriginEnum.NET;
    public GITHUB = OriginEnum.GITHUB;

    public SMALL_DEVICE: ScreenSizeEnum = ScreenSizeEnum.SMALL;
    public BIG_DEVICE: ScreenSizeEnum = ScreenSizeEnum.BIG;
    public MIDDLE_DEVICE: ScreenSizeEnum = ScreenSizeEnum.MIDDLE;

    public screenHeight: number;
    public screenWidth: number;
    public screenSize: ScreenSizeEnum = ScreenSizeEnum.BIG;


    constructor() {
        this.getScreenSize(null);
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        if (this.screenWidth <= 600) {
            this.screenSize = ScreenSizeEnum.SMALL;
        } 
        else if (this.screenWidth > 600 && this.screenWidth <= 850) {
            this.screenSize = ScreenSizeEnum.MIDDLE;
        } 
        else {
            this.screenSize = ScreenSizeEnum.BIG;
        }
        console.log(this.screenHeight, this.screenWidth);
    }

}
