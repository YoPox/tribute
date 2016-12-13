class Util {
    constructor() { }

    static toHex(color) {
        let c = color.toString(16);
        if (c.length == 1) {
            return ("0" + c);
        }
        return c;
    }
}
