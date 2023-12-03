export function deepCopy<T>(instance : T) : T {
    if ( instance === null || instance == undefined){
        return instance;
    }

    if (instance instanceof Date) {
        return new Date(instance.getTime()) as any;
    }

    if (instance instanceof Array){
        var cloneArr = [] as any[];
        (instance as any[]).forEach((value)  => {cloneArr.push(value)});
        
        return cloneArr.map((value: any) => deepCopy<any>(value)) as any;
    }
    
    if (instance instanceof Object) {
        var copyInstance = { ...(instance as { [key: string]: any }
        ) } as { [key: string]: any };
        for (var attr in instance) {
            if ( (instance as Object).hasOwnProperty(attr)) 
                copyInstance[attr] = deepCopy<any>((instance as any)[attr]);
        }
        return copyInstance as T;
    }
    
    return instance;
}