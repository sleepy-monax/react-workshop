export const CursorTool = {
    type: "cursor",
    icon: "cursor-default",
    onCanvasPress: null
}

export const RectTool = {
    type: "rect",
    icon: "vector-square-plus",
    onCanvasPress: ([entities, update], x, y) => {
        update([...entities, {
            id: Math.floor(Math.random() * 2 ** 64),
            type: "rect",
            x: x,
            y: y,
            width: 100,
            height: 100,
            color: "#fff"
        }]);
    }
}

export const TextTool = {
    type: "text",
    icon: "format-annotation-plus",
    onCanvasPress: ([entities, update], x, y) => {
        update([...entities, {
            id: Math.floor(Math.random() * 2 ** 64),
            type: "text",
            x: x,
            y: y,
            width: 100,
            height: 100,
            text: "Hello World",
            color: "#000"
        }]);
    }
}

export const ImageTool = {
    type: "image",
    icon: "image-plus",
    onCanvasPress: ([entities, update], x, y) => {
        update([...entities, {
            id: Math.floor(Math.random() * 2 ** 64),
            type: "image",
            x: x,
            y: y,
            width: 100,
            height: 100,
            uri: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/100`,
            color: "#000"
        }]);
    }
}

export const tools = [CursorTool, RectTool, TextTool, ImageTool];