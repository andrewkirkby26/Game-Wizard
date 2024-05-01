export class Base {

    toJSON(): any {
        // @ts-ignore
        let o = Object.assign({}, this);
        Object.keys(o).forEach((k) => {
            // @ts-ignore
            if (o[k] == undefined) {
                // @ts-ignore
                o[k] = null;
            }
        })
        return o;
    }
}