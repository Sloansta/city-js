class Block {
    constructor(x, y, size, type) {
        this.x = x;
        this.y = y;
        this.size = size; // assuming that the size of tiles will be the same for x and y
        this.type = type;
    }

    draw(context) {
        switch(this.type) {
            case 'water':
                context.fillStyle = "rgb(0, 18, 255)";
                break;
            case 'sand':
                context.fillStyle = "rgb(255, 253, 91)";
                break;
            case 'grass':
                context.fillStyle = "rgb(43, 255, 0)";
                break;
            default: 
                context.fillStyle = "#fff";
        }

        context.fillRect(this.x, this.y, this.size, this.size);
    }
}