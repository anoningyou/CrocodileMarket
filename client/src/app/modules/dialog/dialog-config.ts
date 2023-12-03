import { deepCopy } from "src/app/functions/deep-copy";

export class DialogConfig<D = any> {
    title?: string;
    width: string; 
    height: string;
    modelData?: D;

    constructor(
        title?: string,
        data?: D,
        width?: string,
        height?: string
    ) {
        this.title = title;

        if (data) {
          this.modelData = deepCopy(data);
        }
        
        this.width = width ?? '750px';
        this.height = height ?? '650px';
    }
}